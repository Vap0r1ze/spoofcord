import { ImageResponse } from '@vercel/og'
import { NextRequest, NextResponse } from 'next/server'
import { formatInTimeZone } from 'date-fns-tz'
import Message from '../../../../components/Message'

export const config = {
  runtime: 'edge',
}

/**
 * This is **documentation**
 * @param req {NextRequest}
 * @param res {NextResponse}
 */
export default async function MessageImage(req) {
  const query = Object.fromEntries(req.nextUrl.searchParams.entries()) || {}

  try {
    const dpRes = await fetch(`https://dp.nea.moe/avatar/${query.id}.json`)
    if (!dpRes.ok) return NextResponse.json({
      error: "User doesn't exist",
    }, { status: 400 })

    const user = await dpRes.json()

    const timestamp = query.timestamp || Date.now()
    const tz = query.tz || '+00:00'

    // https://date-fns.org/v2.29.3/docs/format
    query.time ??= formatInTimeZone(timestamp, tz, "'Today at' hh:mm a")

    return new ImageResponse(
      <Message user={user} query={query} />,
      {
        width: +query.w || 400,
        height: +query.h || 100,
        fonts: [{
          name: 'gg sans',
          weight: 400,
          data: await fetch('https://cdn.discordapp.com/attachments/637119506690474004/1066313590157615124/gg_sans-400.woff')
          .then(res => res.arrayBuffer()),
        }, {
          name: 'gg sans',
          weight: 500,
          data: await fetch('https://cdn.discordapp.com/attachments/637119506690474004/1066313671598407680/gg_sans-500.woff')
          .then(res => res.arrayBuffer()),
        }],
        debug: query.debug != null,
      }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      error: err.message,
    }, { status: 500 })
  }
}
