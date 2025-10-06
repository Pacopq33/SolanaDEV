"use client"

export function useMockRewards() {
  const rewards = [
    {
      id: "1",
      type: "expedition",
      amount: 45.5,
      token: "$DST",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "staking",
      amount: 12.25,
      token: "$GXY",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "expedition",
      amount: 67.8,
      token: "$DST",
      timestamp: "8 hours ago",
    },
    {
      id: "4",
      type: "marketplace",
      amount: 150.0,
      token: "$DST",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      type: "staking",
      amount: 8.75,
      token: "$GXY",
      timestamp: "1 day ago",
    },
    {
      id: "6",
      type: "expedition",
      amount: 92.3,
      token: "$DST",
      timestamp: "2 days ago",
    },
  ]

  return { rewards }
}
