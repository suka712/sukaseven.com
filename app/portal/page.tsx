"use client"

import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle, } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useState } from 'react'
import { LucideEdit2, RefreshCcw } from 'lucide-react'

type Toggle = 'email' | 'otp' | 'request'

const Portal = () => {
  const [toggle, setToggle] = useState<Toggle>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const sendOtp = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/auth/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Failed to send OTP')
      setToggle('otp')
    } catch (e) {
      console.log('Shit went wrong:', e)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/auth/otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      if (!res.ok) throw new Error('Invalid OTP')
      window.location.href = '/'
    } catch (e) {
      console.log('Shit went wrong:', e)
      setOtp('')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (toggle === 'email') sendOtp()
    else if (toggle === 'otp') verifyOtp()
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className="w-full max-w-sm py-10" >
        <CardHeader className='flex flex-col pt-4 items-center justify-center'>
          <CardTitle className='text-md text-secondary'>sukaseven/portal</CardTitle>
          <CardTitle className='pt-4 text-xl'>Welcome back</CardTitle>
          <CardDescription className='text-secondary'>
            Login to see cool shit
          </CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="">
                {toggle === 'email' &&
                  <>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className='mt-2'
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="poophead@sukaseven.com"
                      required
                    />
                  </>
                }

                {toggle === 'otp' &&
                  <>
                    <Label htmlFor="email">{`OTP sent to ${email}`}</Label>
                    <div className='flex justify-between mt-2'>
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={v => setOtp(v)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <Button type="button" variant={'outline'} onClick={() => { setToggle('email'); setOtp('') }}><LucideEdit2 /></Button>
                      <Button type="button" variant={'outline'} onClick={sendOtp} disabled={loading}><RefreshCcw /></Button>
                    </div>
                  </>
                }
              </div>
            </div>

            <CardFooter className="flex-col gap-2 px-0 pt-6">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Hold on...' : toggle === 'email' ? 'Send OTP' : 'Verify'}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Request Access?
              </Button>
            </CardFooter>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}

export default Portal