'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

type socialLinks_prop = {
  platform: string,
  url: string
}

type ctaButton_prop = {
  text: string,
  link: string
}

type content_prop = {
  ctaText: string,
  ctaButton: ctaButton_prop,
  socialLinks:socialLinks_prop[]
  footerText: string,
}

type footer_prop = {
  _id: string,
  sectionName: string,
  content: content_prop,
  
}

const Footer = () => {
  const [footer, setfooter] = useState<footer_prop | null>(null)
  const [loading, setloading] = useState<boolean>(false)
  const [responseM, setresponseM] = useState<string>("")

  useEffect(() => {
    const getFooter = async () => {
      try {
        setloading(true)
        const response = await axios.get('/api/get-sections/footer')
        setfooter(response.data.section)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setresponseM(error.response?.data.error?.message || "Internal server error");
        }
      } finally {
        setloading(false)
      }
    }

    getFooter()
  }, [])

  // Loading or Error handling before return
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (responseM) {
    return <h2 className="text-red-400">{responseM}</h2>;
  }

  // Main render after data has been fetched
  return (
    <footer className="bg-gray-900 text-white py-8 w-full">
    <div className="container mx-auto flex flex-col items-center gap-4 max-w-7xl">
      <h2 className="text-2xl font-bold">{footer?.content.ctaText}</h2>
      <p className="text-gray-400 text-center">Join thousands of learners and boost your career today!</p>

      <Link href={footer?.content.ctaButton.link || "#"}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full mt-4">
          {footer?.content.ctaButton.text}
        </button>
      </Link>

      <hr className="border-t border-gray-700 w-full my-6" />

      <div className="flex gap-6">
        {footer?.content.socialLinks && footer.content.socialLinks.map((link, index) => (
          <Link key={index} href={link.url} className="text-gray-400 hover:text-white">
            {link.platform}
          </Link>
        ))}
      </div>

      <p className="text-gray-600 text-sm mt-4">{footer?.content.footerText}</p>
    </div>
  </footer>
  )
}

export default Footer
