import { ImageResponse } from '@vercel/og'
import { NextRequest, NextResponse } from 'next/server';
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
  const data = Object.fromEntries(req.nextUrl.searchParams.entries())

  try {
    const dpRes = await fetch(`https://dp.nea.moe/avatar/${data.id}.json`)
    if (!dpRes.ok) return NextResponse.json({
      error: "User doesn't exist",
    }, { status: 400 })

    const user = await dpRes.json()
    //nickname check. i also comment my code yes thats something i do
    if (data.name != undefined){
      user.username = data.name
    }
    //custom time chec k idk man im drunk
    if (data.time == undefined){
      let temporaryVarName = new Date()
      data.time = `${temporaryVarName.getUTCHours()}:${temporaryVarName.getUTCMinutes()}`
    }


    return new ImageResponse(
      <Message user={user} data={data} />,
      {
        width: 400,
        height: 100,
        fonts: [{
          name: 'gg sans',
          weight: 400,
          data: await fetch('https://cdn.discordapp.com/attachments/637119506690474004/1066313590157615124/gg_sans-400.woff')
          .then(res => res.arrayBuffer()),
        },
        {
          name: 'gg sans',
          weight: 500,
          data: await fetch('https://cdn.discordapp.com/attachments/637119506690474004/1066313671598407680/gg_sans-500.woff')
          .then(res => res.arrayBuffer()),
        }],
      }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      error: err.message,
    }, { status: 500 })
  }
}
