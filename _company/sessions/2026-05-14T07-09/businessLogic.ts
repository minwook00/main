// sessions/2026-05-14T07-09/businessLogic.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 💰 가격 정책 정의 (UI에 표시될 데이터)
export const PLANS = [
    { id: 'single_check', name: '단건 확인권', price: 5000, access: 'Single Access' },
    { id: 'unlimited_pass', name: '무제한 패스권 (1주)', price: 15000, access: 'Unlimited Pass' },
    { id: 'subscription', name: '프리미엄 구독', price: 49900, access: 'Subscription' },
];

/**
 * 사용자에게 적용할 가격 정책 및 권한을 확인하는 함수
 */
export async function getUserPlan(userId: string): Promise<{ plan: any; canViewDetails: boolean }> {
    // 실제 로직에서는 Payment 테이블과 User 테이블을 Join하여 가장 높은 권한을 확인해야 함.
    const paymentRecord = await prisma.payment.findFirst({ where: { userId } });

    if (paymentRecord && paymentRecord.status === 'PAID') {
        return { plan: PLANS.find(p => p.id === 'subscription'), canViewDetails: true };
    } else if (paymentRecord && paymentRecord.status === 'PENDING') {
         return { plan: PLANS[0], canViewDetails: false }; // 결제 대기 중에는 잠김
    }
    // 기본값 또는 미결제 상태
    return { plan: PLANS[0], canViewDetails: false };
}

/**
 * 대화 주제 기반 BDNF 팁 제공 (Prompt 3의 심리 통합)
 */
export function getConversationTip(topic: string): string {
    // 이 함수는 코다리의 내부 로직을 활용하여 가장 적절한 팁을 반환하도록 설계됨.
    const tips = {
        '게임': "상대방이 좋아하는 게임의 숨겨진 스토리를 물어보세요. '그 게임에서 가장 기억에 남는 순간은?' 같은 질문은 몰입도를 즉시 높입니다.",
        '영화': "단순히 줄거리가 아니라, 그 영화가 당신의 가치관에 어떤 영향을 주었는지 대화해보세요. 깊이가 생깁니다.",
        '직업/커리어': "상대방의 목표를 묻기보다, 그 목표를 이루는 과정에서 느낀 감정이나 도전 과제에 대해 질문하세요. 공감대가 형성됩니다.",
    };
    return tips[topic] || "좋은 대화를 위해 상대방에게 진심으로 관심을 표현하세요.";
}

// --- 사용 예시 (테스트 목적) ---
/*
async function testLogic() {
    const userId = 'some-user-id';
    const planInfo = await getUserPlan(userId);
    console.log("User Plan:", planInfo); // 유료 정보 잠금 로직 테스트

    const tip = getConversationTip('게임');
    console.log("BDNF Tip:", tip); // 대화 팁 제공 테스트
}
testLogic();
*/