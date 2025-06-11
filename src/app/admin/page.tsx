
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Upload, Edit3, Share2 } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-muted/40">
        <Container>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Admin Dashboard</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              Manage blog articles, social media content, and your media library from this central hub.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 items-start">
            
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <Edit3 className="w-7 h-7 text-accent" />
                  <CardTitle className="text-2xl text-primary">Manage Blog Posts</CardTitle>
                </div>
                <CardDescription>Create, edit, and publish engaging blog articles for your audience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Create New Blog Post</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="blogTitle" className="font-medium">Title</Label>
                      <Input id="blogTitle" placeholder="Enter blog post title" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="blogContent" className="font-medium">Content</Label>
                      <Textarea id="blogContent" placeholder="Write your blog post here..." rows={6} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="blogImage" className="font-medium">Featured Image</Label>
                      <Input id="blogImage" type="file" className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Save Draft
                        </Button>
                        <Button variant="outline" className="flex-1 border-accent text-accent hover:bg-accent/10 hover:text-accent">
                            Publish Post
                        </Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Existing Posts</h3>
                    <p className="text-sm text-muted-foreground"> (A list or table of existing blog posts with edit/delete options would appear here.)</p>
                    {/* Placeholder for list of existing posts */}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
                <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                        <Share2 className="w-7 h-7 text-accent" />
                        <CardTitle className="text-2xl text-primary">Manage Social Media</CardTitle>
                    </div>
                    <CardDescription>Draft, schedule, and publish updates across your social media channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Create New Social Post</h3>
                    <div className="space-y-4">
                        <div>
                        <Label htmlFor="socialPlatform" className="font-medium">Platform</Label>
                         <select id="socialPlatform" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                            <option value="">Select Platform...</option>
                            <option value="twitter">X (Twitter)</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="facebook">Facebook</option>
                        </select>
                        </div>
                        <div>
                        <Label htmlFor="socialContent" className="font-medium">Content</Label>
                        <Textarea id="socialContent" placeholder="Draft your social media post..." rows={4} className="mt-1" />
                        </div>
                        <div>
                        <Label htmlFor="socialMediaUpload" className="font-medium">Attach Media (Image/Video)</Label>
                        <Input id="socialMediaUpload" type="file" className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                        </div>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 pt-2">
                            <Share2 className="w-4 h-4 mr-2" />
                            Schedule Post
                        </Button>
                    </div>
                    </div>
                     <Separator />
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Scheduled Posts</h3>
                        <p className="text-sm text-muted-foreground">(A list or calendar of scheduled social media posts would appear here.)</p>
                    </div>
                </CardContent>
                </Card>

                <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                        <Upload className="w-7 h-7 text-accent" />
                        <CardTitle className="text-2xl text-primary">Media Library</CardTitle>
                    </div>
                    <CardDescription>Upload, organize, and manage your website's images and documents.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="mediaFile" className="font-medium">Upload New Media</Label>
                        <Input id="mediaFile" type="file" className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                    </Button>
                    <Separator className="my-6"/>
                     <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Uploaded Media Gallery</h3>
                        <div className="p-4 border border-dashed rounded-md min-h-[100px] flex items-center justify-center bg-muted/50">
                            <p className="text-sm text-muted-foreground">(A gallery or list of uploaded media with management options would appear here.)</p>
                        </div>
                    </div>
                </CardContent>
                </Card>
            </div>

          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
