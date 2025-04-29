'use client'
import React from 'react'
import HeroEditor from '@/components/HeroEditor'
import AboutEditor from '@/components/AboutEditor'
import Feature from '@/components/Feature'
import FooterEditor from '@/components/FooterEdit'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const Page = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Panel</h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <HeroEditor />
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>About Section</CardTitle>
        </CardHeader>
        <CardContent>
          <AboutEditor />
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Feature Section</CardTitle>
        </CardHeader>
        <CardContent>
          <Feature />
        </CardContent>
      </Card>

      <Card className="shadow-md mb-10">
        <CardHeader>
          <CardTitle>Footer Section</CardTitle>
        </CardHeader>
        <CardContent>
          <FooterEditor />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
