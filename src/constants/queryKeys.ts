export const QUERY_KEYS = {
  CHAT: {
    ALL: ['rooms'],
    DETAIL: (id: number) => ['room', id] as const,
    MESSAGES: (id: number) => ['room', id, 'message'] as const,
  },
  FRIEND: {
    ALL: ['friends'] as const,
    DETAIL: (id: number) => ['friend', id] as const,
    RANK: ['rank'] as const,
  },
  USER: {
    USERINFO: ['userInfo'] as const,
    PHONENUMBER: (phoneNumber: string) => ['phoneNumber', phoneNumber] as const,
  },
  REWARD: {
    BY_MONTH: (year: number, month: number) => ['reward', year, month] as const,
  },
  NOTIFICATION: {
    ALL: ['notifications'] as const,
  },
} as const;

// 중앙관리의 장점
// 여러명이 동일한 쿼리 키를 사용해서 발생하는 참사를 막음
// 유지보수 : 쿼리 키 변경이 필요할때 여기서만 하면 됨
// 자동완성 : 편하고 실수를 줄임

// 사용할때는
// queryKey: QUERY_KEYS.ROOM.ALL
// 실제로는 queryKey: ['rooms']

// queryKey: QUERY_KEYS.ROOM.DETAIL(id)
// 실제로는 queryKey: ['room', id]
