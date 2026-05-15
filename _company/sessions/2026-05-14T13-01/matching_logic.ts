// sessions/2026-05-14T13-01/matching_logic.ts
import { User } from './types'; // 가상의 타입 정의를 가정합니다.

/**
 * 관계 매칭을 위한 핵심 로직 모듈
 * 가치관 불일치 점수와 제약 조건을 기반으로 잠재적 매칭 쌍을 평가합니다.
 */

interface MatchingInput {
    userA: User;
    userB: User;
}

// M1~M4 가치관 충돌 지표를 기반으로 유클리드 거리 계산 함수 (가정)
function calculateValueMismatch(userA: User, userB: User): number {
    // 실제 구현에서는 M1~M4 점수를 벡터로 보고 유클리드 거리를 계산해야 합니다.
    const m1Diff = Math.abs(userA.m1_score - userB.m1_score);
    const m2Diff = Math.abs(userA.m2_score - userB.m2_score);
    const m3Diff = Math.abs(userA.m3_score - userB.m3_score);
    const m4Diff = Math.abs(userA.m4_score - userB.m4_score);

    // 단순 합산 (실제로는 가중치를 부여해야 함)
    return m1Diff + m2Diff + m3Diff + m4Diff;
}

/**
 * 매칭 후보를 필터링하고 점수를 계산하는 메인 함수
 * @param input 매칭할 두 사용자의 데이터 객체
 * @returns 매칭 점수 및 제약 조건 검증 결과
 */
export function findMatchingPair(input: MatchingInput): { score: number, isMatch: boolean, reason: string } {
    const mismatchScore = calculateValueMismatch(input.userA, input.userB);

    // 1. Hard Constraint 필터링 (예시: 최소 가치관 점수 요구)
    if (input.userA.m1_score < 3 || input.userB.m2_score < 4) {
        return { score: mismatchScore, isMatch: false, reason: "Hard Constraint 미충족: 필수 가치관 기준을 만족하지 못함." };
    }

    // 2. 유클리드 거리 기반 점수 계산 (낮을수록 잘 맞음)
    const finalScore = Math.min(mismatchScore, 100); // 점수를 100점 만점으로 정규화 가정

    if (finalScore < 30) {
        return { score: finalScore, isMatch: true, reason: "높은 가치관 일치도 발견." };
    } else if (finalScore < 60) {
        return { score: finalScore, isMatch: false, reason: "중간 수준의 충돌. 추가 검토 필요." };
    } else {
        return { score: finalScore, isMatch: false, reason: "높은 가치관 불일치로 잠재적 매칭 어려움." };
    }
}

// 테스트용 예시 (실제 DB 연동 전 로직 검증)
/*
const userA_data = { m1_score: 5, m2_score: 3, m3_score: 4, m4_score: 2 };
const userB_data = { m1_score: 4, m2_score: 4, m3_score: 3, m4_score: 3 };
const result = findMatchingPair({ userA: userA_data, userB: userB_data });
console.log(result);
*/
export { calculateValueMismatch, findMatchingPair };