import { HealthPing } from "@/types/portfolio"
import { NextResponse } from "next/server"

export const GET = async () => {
  const pings = await getHealthPings()
  return NextResponse.json(pings)
}

export const getHealthPings = async () => {
  const services = {
    'KatanaID': 'https://katanaid.com',
    'Caphne': 'https://caphne.co',
    'Anyu': 'https://anyu.sukaseven.com',
    'Tldraw': 'https://tldraw.sukaseven.com',
    'Hasaki': 'https://hasaki.sukaseven.com',
    'Hanshi': 'https://hanshi.sukaseven.com',
  }

  const pings: HealthPing[] = []

  for (let service of Object.entries(services)) {
    const { isUp, latency } = await ping(service[1])
    pings.push({
      name: service[0],
      isUp,
      latency
    })
  }

  return pings
}

const ping = async (url: string) => {
  let start, end
  try {
    start = performance.now()
    await fetch(url, { cache: 'no-store' })
    end = performance.now()
  } catch (e) {
    return {
      isUp: false,
      latency: 0,
    }
  }

  return {
    isUp: true,
    latency: Math.round(end - start)
  }
}