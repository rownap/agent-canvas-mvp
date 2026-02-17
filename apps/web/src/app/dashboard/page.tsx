"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [outputUrl, setOutputUrl] = useState<string | null>(null)

    const handleRender = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Mock API call for now
        setTimeout(() => {
            setOutputUrl("/placeholder-output.png") // We will fix this connection later
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">AgentCanvas Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>Download Assets</Button>
                </div>
            </div>
            <Tabs defaultValue="create" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="create">Create New Asset</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="create" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Configure Render</CardTitle>
                                <CardDescription>
                                    Customize your social media asset.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <form onSubmit={handleRender}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="template">Template</Label>
                                            <Select defaultValue="social-post">
                                                <SelectTrigger id="template">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    <SelectItem value="social-post">Social Post (Generic)</SelectItem>
                                                    <SelectItem value="story">Instagram Story</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" placeholder="Enter title" defaultValue="Hello AgentCanvas" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="image">Background Image URL</Label>
                                            <Input id="image" placeholder="https://..." />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleRender} disabled={loading}>
                                    {loading ? "Rendering..." : "Generate Asset"}
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                                <CardDescription>
                                    Real-time preview of your asset.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-square w-full rounded-md border border-dashed flex items-center justify-center bg-muted/50">
                                    {outputUrl ? (
                                        <p className="text-green-500 font-bold">Render Complete!</p>
                                    ) : (
                                        <span className="text-muted-foreground">No output generated</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
