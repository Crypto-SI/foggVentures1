
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AiBlogPostGenerator } from '@/components/admin/AiBlogPostGenerator'; // New import
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent as ShadSidebarContent,
  SidebarHeader as ShadSidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';

import { Mail, Newspaper, Share2, CalendarDays, ImageUp, LayoutDashboard, Upload, Edit3, LibraryBig, UploadCloud, Wand2, Trash2 } from 'lucide-react';

type AdminSection = 'dashboard' | 'mailingList' | 'blogPosts' | 'socialMedia' | 'schedule' | 'mediaLibrary' | 'knowledgeBase' | 'gallery';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [showAiBlogGenerator, setShowAiBlogGenerator] = useState(false);

  const renderSection = () => {
    if (activeSection === 'blogPosts' && showAiBlogGenerator) {
      return <AiBlogPostGenerator onComplete={() => setShowAiBlogGenerator(false)} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <LayoutDashboard className="w-7 h-7 text-accent mr-3" /> Welcome to the Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">Select a section from the sidebar to manage your content and operations.</p>
              <p className="mt-4">You can manage blog posts, social media content, your media library, mailing lists, schedules, and the AI knowledge base from this central hub.</p>
            </CardContent>
          </Card>
        );
      case 'gallery':
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-1">
                <ImageUp className="w-7 h-7 text-accent" />
                <CardTitle className="text-2xl text-primary">Manage Gallery</CardTitle>
              </div>
              <CardDescription>Add, edit, or delete images in your public gallery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Add New Gallery Item</h3>
                <div className="space-y-4 p-4 border rounded-md">
                   <div>
                    <Label htmlFor="galleryImage" className="font-medium">Image Upload</Label>
                    <Input id="galleryImage" type="file" accept="image/*" className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                  </div>
                  <div>
                    <Label htmlFor="galleryTitle" className="font-medium">Title</Label>
                    <Input id="galleryTitle" placeholder="e.g., Meeting with the Minister" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="galleryCaption" className="font-medium">Caption</Label>
                    <Textarea id="galleryCaption" placeholder="e.g., Discussing bilateral trade agreements..." rows={3} className="mt-1" />
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Upload className="w-4 h-4 mr-2" /> Add to Gallery
                  </Button>
                </div>
              </div>
              <Separator />
              <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Existing Gallery Items</h3>
                  <div className="p-4 border border-dashed rounded-md min-h-[100px] flex items-center justify-center bg-muted/50">
                    <p className="text-sm text-muted-foreground">(A list or grid of existing gallery items with edit/delete options would appear here.)</p>
                  </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'blogPosts':
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-3">
                    <Newspaper className="w-7 h-7 text-accent" />
                    <CardTitle className="text-2xl text-primary">Manage Blog Posts</CardTitle>
                </div>
                <Button onClick={() => setShowAiBlogGenerator(true)} variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </div>
              <CardDescription>Create, edit, and publish engaging blog articles for your audience. Or use the AI assistant to help draft posts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Create New Blog Post Manually</h3>
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
              </div>
            </CardContent>
          </Card>
        );
      case 'socialMedia':
        return (
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
        );
      case 'mediaLibrary':
        return (
          <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                    <ImageUp className="w-7 h-7 text-accent" />
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
        );
      case 'knowledgeBase':
        return (
          <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                    <LibraryBig className="w-7 h-7 text-accent" />
                    <CardTitle className="text-2xl text-primary">Manage Knowledge Base</CardTitle>
                </div>
                <CardDescription>Upload PDF files and other documents to enhance the AI assistant's knowledge.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="knowledgeFile" className="font-medium">Upload New Document (PDF, TXT, DOCX)</Label>
                    <Input 
                      id="knowledgeFile" 
                      type="file" 
                      accept=".pdf,.txt,.docx" 
                      className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
                    />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Upload Document to Knowledge Base
                </Button>
                <Separator className="my-6"/>
                 <div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Uploaded Documents</h3>
                    <div className="p-4 border border-dashed rounded-md min-h-[100px] flex items-center justify-center bg-muted/50">
                        <p className="text-sm text-muted-foreground">(A list of uploaded documents with management options would appear here.)</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        );
      case 'mailingList':
        return (
          <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                    <Mail className="w-7 h-7 text-accent" />
                    <CardTitle className="text-2xl text-primary">Manage Mailing List</CardTitle>
                </div>
                <CardDescription>View subscribers, manage lists, and draft email campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Placeholder for mailing list management tools (e.g., subscriber list, create campaign button, view past campaigns).</p>
            </CardContent>
          </Card>
        );
      case 'schedule':
        return (
          <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                    <CalendarDays className="w-7 h-7 text-accent" />
                    <CardTitle className="text-2xl text-primary">Manage Schedule</CardTitle>
                </div>
                <CardDescription>View and manage scheduled content, appointments, or other events.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Placeholder for a scheduling calendar or list of scheduled items (e.g., upcoming social media posts, blog release dates).</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card className="shadow-lg">
            <CardHeader><CardTitle>Error</CardTitle></CardHeader>
            <CardContent><p>Selected section not found. Please choose from the sidebar.</p></CardContent>
          </Card>
        );
    }
  };
  
  const handleSidebarClick = (section: AdminSection) => {
    if (section === 'blogPosts' && showAiBlogGenerator) {
      setShowAiBlogGenerator(false); // If AI generator is open, clicking Blog Posts again should close it and show manual
    }
    setActiveSection(section);
  }


  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 h-[calc(100svh-theme(spacing.16))]"> {/* Use svh and ensure Header height is accounted for */}
          <Sidebar collapsible="icon"> {/* Removed h-full, sidebar will manage its own height */}
            <ShadSidebarHeader className="p-2 border-b border-sidebar-border">
              <h2 className="text-lg font-semibold text-sidebar-foreground text-center group-data-[collapsible=icon]:hidden">Admin Menu</h2>
              <LayoutDashboard className="h-6 w-6 mx-auto text-sidebar-primary group-data-[collapsible=icon]:block hidden" />
            </ShadSidebarHeader>
            <ShadSidebarContent className="flex-grow">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('dashboard')} isActive={activeSection === 'dashboard' && !showAiBlogGenerator} tooltip="Dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('knowledgeBase')} isActive={activeSection === 'knowledgeBase' && !showAiBlogGenerator} tooltip="Knowledge Base">
                    <LibraryBig />
                    <span>Knowledge Base</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('mailingList')} isActive={activeSection === 'mailingList' && !showAiBlogGenerator} tooltip="Mailing List">
                    <Mail />
                    <span>Mailing List</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => handleSidebarClick('blogPosts')} 
                    isActive={activeSection === 'blogPosts'} 
                    tooltip="Blog Posts"
                  >
                    <Newspaper />
                    <span>Blog Posts</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('socialMedia')} isActive={activeSection === 'socialMedia' && !showAiBlogGenerator} tooltip="Social Media">
                    <Share2 />
                    <span>Social Media</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('schedule')} isActive={activeSection === 'schedule' && !showAiBlogGenerator} tooltip="Schedule">
                    <CalendarDays />
                    <span>Schedule</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('mediaLibrary')} isActive={activeSection === 'mediaLibrary' && !showAiBlogGenerator} tooltip="Media Library">
                    <ImageUp />
                    <span>Media Library</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => handleSidebarClick('gallery')} isActive={activeSection === 'gallery'} tooltip="Gallery">
                    <ImageUp />
                    <span>Gallery</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </ShadSidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 overflow-y-auto">
            <main className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                        { (activeSection === 'blogPosts' && showAiBlogGenerator) ? "AI Blog Post Generator" :
                          activeSection === 'knowledgeBase' ? 'Knowledge Base' :
                          activeSection === 'gallery' ? 'Gallery Management' :
                          activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')
                        }
                    </h1>
                    <p className="mt-1 text-md text-muted-foreground">
                        { (activeSection === 'blogPosts' && showAiBlogGenerator) ? "Follow the steps to generate a new blog post with AI assistance." :
                          activeSection === 'dashboard' ? 'Overview of your admin panel.' : 
                          activeSection === 'knowledgeBase' ? 'Upload and manage documents for the AI assistant.' :
                          activeSection === 'gallery' ? 'Add, edit, or delete items in your public gallery.' :
                         `Manage your ${activeSection.toLowerCase().replace(/([A-Z])/g, ' $1')}.`}
                    </p>
                </div>
                <SidebarTrigger className="md:hidden text-primary" />
              </div>
              <div className="max-w-5xl mx-auto">
                {renderSection()}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Footer />
    </div>
  );
}

    