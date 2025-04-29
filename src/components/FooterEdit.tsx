'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type SocialLink = {
  platform: string
  url: string
}

type CtaButton = {
  text: string
  link: string
}

type Content = {
  ctaText: string
  ctaButton: CtaButton
  socialLinks: SocialLink[]
  footerText: string
}

type FooterSection = {
  _id: string
  sectionName: string
  content: Content
}

const FooterEditor = () => {
  const [footer, setFooter] = useState<FooterSection | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseM, setResponseM] = useState<string>("")

  const getFooter = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/get-sections/footer')
      setFooter(response.data.section)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseM(error.response?.data.error?.message || "Internal server error")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await axios.put('/api/update-sections/footer', {
        content: footer?.content,
      })
      await getFooter()
      alert("Footer section updated!")
    } catch (err) {
      alert("Failed to update Footer section")
    }
  }

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    if (!footer) return
    const updatedLinks = [...footer.content.socialLinks]
    updatedLinks[index][field] = value
    setFooter({
      ...footer,
      content: { ...footer.content, socialLinks: updatedLinks },
    })
  }



  useEffect(() => {
    getFooter()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (!footer) return <div className="text-red-500 text-center py-10">{responseM || "No Footer section found!"}</div>

  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label>CTA Text</Label>
        <Textarea
          value={footer.content.ctaText}
          onChange={(e) => setFooter({ ...footer, content: { ...footer.content, ctaText: e.target.value } })}
        />
      </div>

      <div className="grid gap-2">
        <Label>CTA Button Text</Label>
        <Input
          value={footer.content.ctaButton.text}
          onChange={(e) => setFooter({ ...footer, content: { ...footer.content, ctaButton: { ...footer.content.ctaButton, text: e.target.value } } })}
        />
        <Label>CTA Button Link</Label>
        <Input
          value={footer.content.ctaButton.link}
          onChange={(e) => setFooter({ ...footer, content: { ...footer.content, ctaButton: { ...footer.content.ctaButton, link: e.target.value } } })}
        />
      </div>

      <div className="space-y-4">
        <Label>Social Links</Label>
        {footer.content.socialLinks.map((link, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder="Platform"
              value={link.platform}
              onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
            />
            <Input
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <Label>Footer Text</Label>
        <Textarea
          value={footer.content.footerText}
          onChange={(e) => setFooter({ ...footer, content: { ...footer.content, footerText: e.target.value } })}
        />
      </div>

      <Button onClick={handleSave} className='hover:cursor-pointer'>Save Changes</Button>
    </div>
  )
}

export default FooterEditor
