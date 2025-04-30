'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

type ImageProp = {
  url: string
  altText: string
}

type ContentProp = {
  introText: string
  image: ImageProp
}

type AboutSection = {
  _id: string
  sectionName: string
  content: ContentProp
  order: number
}

const AboutEditor = () => {
  const [about, setAbout] = useState<AboutSection | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseM, setResponseM] = useState<string>("")

  const getAbout = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/get-sections/about')
      setAbout(response.data.section)
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
      await axios.put('/api/update-sections/about', {
        content: about?.content,
      })
      await getAbout()
      alert("About section updated!")
    } catch (err) {
      alert("Failed to update About section")
      console.log(err)
    }
  }

  useEffect(() => {
    getAbout()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (!about) return <div className="text-red-500 text-center py-10">No About section found!</div>

  return (
<>
   { responseM?(<h2 className='text-red-400'></h2>):(<div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="introText">Intro Text</Label>
        <Textarea
          id="introText"
          value={about.content.introText}
          onChange={(e) =>
            setAbout({ ...about, content: { ...about.content, introText: e.target.value } })
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={about.content.image.url}
          onChange={(e) =>
            setAbout({
              ...about,
              content: {
                ...about.content,
                image: { ...about.content.image, url: e.target.value },
              },
            })
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="altText">Alt Text</Label>
        <Input
          id="altText"
          value={about.content.image.altText}
          onChange={(e) =>
            setAbout({
              ...about,
              content: {
                ...about.content,
                image: { ...about.content.image, altText: e.target.value },
              },
            })
          }
        />
      </div>

      <div>
        <p className="mb-2 text-sm text-muted-foreground">Preview:</p>
        <Image
          src={about.content.image.url}
          alt={about.content.image.altText}
          width={500}
          height={300}
          className="rounded-md border shadow"
        />
      </div>

      <Button onClick={handleSave} className='hover:cursor-pointer'>Save Changes</Button>
    </div>)}
    </>
  )
}

export default AboutEditor
