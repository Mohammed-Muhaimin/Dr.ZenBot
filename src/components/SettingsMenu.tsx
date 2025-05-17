"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Sun, Moon, Trash2, Monitor } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { handleDeleteUserSymptomHistory } from "@/lib/actions"

interface SettingsMenuProps {
  onHistoryCleared?: () => void;
}

export function SettingsMenu({ onHistoryCleared }: SettingsMenuProps) {
  const { currentUser } = useAuth()
  const { toast } = useToast()
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleEraseHistory = async () => {
    if (!currentUser) {
      toast({ title: "Error", description: "You must be logged in to delete history.", variant: "destructive" })
      return
    }
    setIsDeleting(true)
    const result = await handleDeleteUserSymptomHistory(currentUser.uid)
    setIsDeleting(false)
    setIsDialogOpen(false)

    if (result.success) {
      toast({ title: "Success", description: "Your analysis history has been cleared." })
      if (onHistoryCleared) {
        onHistoryCleared();
      }
    } else {
      toast({ title: "Error", description: result.error || "Failed to clear history.", variant: "destructive" })
    }
  }

  if (!mounted) {
    // Render a placeholder or null until mounted to avoid hydration mismatch
    return (
      <Button variant="ghost" size="icon" disabled>
        <Settings className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open settings menu">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {currentTheme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
              <span>Theme: {theme?.charAt(0).toUpperCase() + theme!.slice(1)}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <Sun className="mr-2 h-4 w-4" /> Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <Moon className="mr-2 h-4 w-4" /> Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <Monitor className="mr-2 h-4 w-4" /> System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {currentUser && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Data Management</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear My History
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm History Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all your past symptom analyses? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEraseHistory}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete History"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
