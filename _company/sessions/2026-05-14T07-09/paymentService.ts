// sessions/2026-05-14T07-09/paymentService.ts

import { PrismaClient, Payment, Plan } from '@prisma/client';
import * as TossPayments from './tossPaymentsAdapter'; // 외부 어댑터 가정
import * as KakaoPay from './kakaoPayAdapter'; // 외부 어댑터 가정

const prisma = new PrismaClient();

/**
 * 결제 처리 핸들러 (토스페이먼츠/카카오페이 통합)
 * @param paymentData 결제 정보 객체
 * @param planId 선택된 요금제 ID
 * @returns 결제 성공 여부 및 트랜잭션 ID
 */
export async function processPayment(paymentData: any, planId: string): Promise<{ success: boolean; transactionId: string }> {
    console.log(`[Payment] Starting payment for Plan ID: ${planId}`);

    let transactionResult = null;

    try {
        if (paymentData.provider === 'toss') {
            // 토스페이먼츠 연동 시도
            transactionResult = await TossPayments.process(paymentData, planId);
            console.log("[Payment] Toss Payments successful.");
        } else if (paymentData.provider === 'kakao') {
            // 카카오페이 연동 시도
            transactionResult = await KakaoPay.process(paymentData, planId);
            console.log("[Payment] KakaoPay successful.");
        } else {
            throw new Error("Unsupported payment provider.");
        }

        // 실제 결제 성공 후 DB 업데이트 로직 (Prisma 트랜잭션)
        await prisma.$transaction(async (tx) => {
            const paymentRecord = await tx.payment.create({
                data: {
                    userId: paymentData.userId, // 사용자 ID는 외부 인증에서 확보되어야 함
                    planId: planId,
                    status: 'PAID',
                    provider: paymentData.provider,
                    transactionId: transactionResult.id || paymentData.transactionId,
                    amount: paymentData.amount,
                    createdAt: new Date(),
                },
            });
            // 구독 모델인 경우, 해당 사용자의 플랜을 업데이트하거나 활성화 상태를 설정할 수 있음
            if (planId.includes('subscription')) {
                 await tx.user.paidPlans.create({
                     data: {
                         userId: paymentRecord.userId,
                         planId: planId,
                         status: 'ACTIVE',
                     }
                 });
            }
        });

        return { success: true, transactionId: transactionResult.id || 'N/A' };

    } catch (error) {
        console.error("[Payment Error] Payment failed:", error);
        // 결제 실패 시 상태는 실패로 기록
        throw new Error(`Payment failed: ${error.message}`);
    }
}

/**
 * 유료 정보 잠금 미들웨어 로직
 * 상세 프로필 접근 권한 확인 및 심리적 장치 삽입
 * @param req Express 요청 객체
 * @param res Express 응답 객체
 * @param next 다음 미들웨어 함수
 */
export async function checkPaidAccess(req: any, res: any, next: any) {
    const userId = req.user?.id; // 인증된 사용자 ID (미들웨어에서 확보되어야 함)
    const requestedProfileId = req.params.profileId; // 접근하려는 프로필 ID

    if (!userId || !requestedProfileId) {
        return next(); // 인증 실패 시 통과
    }

    try {
        // 1. 결제 상태 확인 (DB 조회)
        const paymentRecord = await prisma.payment.findUnique({
            where: { userId, planId: 'any' }, // 모든 플랜의 결제 기록 확인
        });

        // **가정:** 여기서는 특정 프로필 접근에 필요한 구독/결제 상태를 별도로 확인해야 함.
        // 실제 구현에서는 Profile 테이블과 Payment 테이블을 Join하여 복잡한 로직이 필요함.

        const isPaid = paymentRecord && paymentRecord.status === 'PAID'; // 단순화된 예시

        if (!isPaid) {
            // 2. 유료 정보 잠금 및 심리적 장치 삽입 (코르티솔 관리)
            res.status(403).json({
                error: "접근 권한 부족",
                message: "상세 프로필을 보려면 프리미엄 멤버십이 필요합니다.",
                psychologicalHint: "당신의 대화에 매력을 느낀 N명이 있습니다! 잠시만 기다려 주세요." // BDNF/호기심 유발 문구 삽입
            });
            return;
        }

        // 3. 접근 허용 (DB에서 상세 정보 로드 후 전송)
        const profile = await prisma.user.findUnique({ where: { id: requestedProfileId } });
        res.json(profile);
        next();

    } catch (error) {
        console.error("Access Check Error:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
}
// --------------------------------------------------

/**
 * 대화 주제 관련 BDNF 기반 대화 팁 제공 함수 (추가 기능)
 */
export function getConversationTip(topic: string): string {
    const tips = {
        '게임': "상대방이 좋아하는 게임의 숨겨진 스토리를 물어보세요. '그 게임에서 가장 기억에 남는 순간은?' 같은 질문은 몰입도를 즉시 높입니다.",
        '영화': "단순히 줄거리가 아니라, 그 영화가 당신의 가치관에 어떤 영향을 주었는지 대화해보세요. 깊이가 생깁니다.",
        '직업/커리어': "상대방의 목표를 묻기보다, 그 목표를 이루는 과정에서 느낀 감정이나 도전 과제에 대해 질문하세요. 공감대가 형성됩니다.",
    };
    return tips[topic] || "좋은 대화를 위해 상대방에게 진심으로 관심을 표현하세요.";
}
// --------------------------------------------------
// 외부 어댑터 파일 (가정)
// 이 파일들은 실제 API 연동 로직을 담고 있어야 함.
<create_file path="sessions/2026-05-14T07-09/tossPaymentsAdapter.ts">
export class TossPaymentsAdapter {
    static async process(data: any, planId: string): Promise<{ id: string }> {
        // 실제 토스페이먼츠 API 호출 로직 (Mock)
        console.log(`[MOCK] Calling Toss Payments for Plan: ${planId}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션
        return { id: `toss_${Date.now()}` };
    }
}
<create_file path="sessions/2026-05-14T07-09/kakaoPayAdapter.ts">
export class KakaoPayAdapter {
    static async process(data: any, planId: string): Promise<{ id: string }> {
        // 실제 카카오페이 API 호출 로직 (Mock)
        console.log(`[MOCK] Calling KakaoPay for Plan: ${planId}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션
        return { id: `kakao_${Date.now()}` };
    }
}