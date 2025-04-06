import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate-path'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
  try {
    const { Task, Des, StartTime, FinishTime, State } = await req.json()

    const newTask = await prisma.todoList.create({
      data: {
        Task,
        Des,
        StartTime,
        FinishTime,
        State
      }
    })
    if (!newTask) {
      return NextResponse.json(
        {
          message: `up error, try again`
        },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*', //http://localhost:5173
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      )
    }
    revalidatePath('/')
    return NextResponse.json(
      {
        message: `OK!`
      },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*', //http://localhost:5173
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', //http://localhost:5173
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    )
  }
}
