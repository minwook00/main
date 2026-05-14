/**
 * User Model for storing psychological (A) and professional (F) data.
 * 실제 구현 시에는 MongoDB, PostgreSQL 등의 DB 스키마로 대체됩니다.
 */
class User {
    constructor(id, name, affinityA, skillF) {
        this.id = id;
        this.name = name;
        // A: 심리/성향 데이터 (예: MBTI 유사 값)
        this.affinityA = affinityA || 'N/A'; 
        // F: 전문성/스킬 데이터 (예: 보유 기술 스킬)
        this.skillF = skillF || 'N/A'; 
    }
}

module.exports = User;