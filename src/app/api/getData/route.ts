import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // console.log('Attempting to fetch data...')
    // get List
    const data = await prisma.todoList.findMany()
    console.log('Fetched data:', data)

    if (!data) {
      console.log('No data found')
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }

    return NextResponse.json(
      { data },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', //http://localhost:xxxx
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    )
  } catch (error) {
    console.error('Detailed error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
