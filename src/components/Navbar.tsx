import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Home, 
  User, 
  Settings, 
  CreditCard, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  Check,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface NavbarProps {
  showBack?: boolean;
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ showBack = true, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path.includes('/movie/')) return 'Movie Details';
    if (path.includes('/theater/')) return 'Select Theater';
    if (path.includes('/seats/')) return 'Select Seats';
    if (path.includes('/food/')) return 'Food & Beverages';
    if (path.includes('/checkout/')) return 'Checkout';
    if (path.includes('/confirmation/')) return 'Booking Confirmed';
    return 'TAP2SEAT';
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/30 via-black/20 to-transparent backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Back & Home */}
          <div className="flex items-center gap-2">
            {showBack && !isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hover:bg-white/10 hover:text-white text-white/90"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHome}
                className="hover:bg-white/10 hover:text-white text-white/90"
              >
                <Home className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            )}
          </div>

          {/* Center - Title */}
          <div className="flex-1 text-center">
            {!isHomePage && (
              <h1 className="font-cinematic text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                {getPageTitle()}
              </h1>
            )}
          </div>

          {/* Right Side - Profile & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Desktop Profile Menu */}
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Online
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hover:bg-white/10 text-white/90 hover:text-white"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsPaymentOpen(true)}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 hover:text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-white/10 text-white/90 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-black/50 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsProfileOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsPaymentOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Methods
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Separator />
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-red-500 hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Settings Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="glass-card max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary-glow">Profile Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings and preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                <Button variant="outline" size="sm" className="mt-1">
                  Change Photo
                </Button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="font-semibold">Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="flex-1">Email Notifications</Label>
                  <input type="checkbox" id="notifications" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="promotions" className="flex-1">Promotional Offers</Label>
                  <input type="checkbox" id="promotions" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reminders" className="flex-1">Movie Reminders</Label>
                  <input type="checkbox" id="reminders" defaultChecked className="rounded" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                Cancel
              </Button>
              <Button variant="cinema">Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Methods Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="glass-card max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary-glow">Payment Methods</DialogTitle>
            <DialogDescription>
              Add or manage your payment methods for faster checkout.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Existing Payment Methods */}
            <div>
              <h3 className="font-semibold mb-3">Saved Payment Methods</h3>
              <div className="space-y-3">
                <Card className="p-4 border border-primary/20 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/27</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      <Check className="w-3 h-3 mr-1" />
                      Default
                    </Badge>
                  </div>
                </Card>
                
                <Card className="p-4 border border-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-red-600 to-red-800 rounded flex items-center justify-center text-white text-xs font-bold">
                        MC
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 8888</p>
                        <p className="text-sm text-muted-foreground">Expires 03/26</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Set Default
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Digital Wallets */}
            <div>
              <h3 className="font-semibold mb-3">Digital Wallets</h3>
              <div className="grid grid-cols-3 gap-3">
                <Card className="p-3 text-center hover:bg-primary/5 cursor-pointer transition-colors">
                  <div className="w-8 h-8 mx-auto mb-1 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">FRM</span>
                  </div>
                  <p className="text-xs">Frimi</p>
                </Card>
                <Card className="p-3 text-center hover:bg-primary/5 cursor-pointer transition-colors">
                  <div className="w-8 h-8 mx-auto mb-1 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">GNE</span>
                  </div>
                  <p className="text-xs">Genie</p>
                </Card>
                <Card className="p-3 text-center hover:bg-primary/5 cursor-pointer transition-colors">
                  <div className="w-8 h-8 mx-auto mb-1 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">eZ</span>
                  </div>
                  <p className="text-xs">eZ Cash</p>
                </Card>
              </div>
            </div>

            {/* Add New Payment Method */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Add New Card</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Card
                </Button>
              </div>
              <div className="space-y-4 p-4 border border-dashed border-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                    className="font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="saveCard" className="rounded" />
                  <Label htmlFor="saveCard" className="text-sm">
                    Save this card for future payments
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
                Close
              </Button>
              <Button variant="cinema">Save Payment Method</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
