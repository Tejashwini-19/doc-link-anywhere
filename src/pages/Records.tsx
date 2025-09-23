import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  ArrowLeft, 
  Upload,
  Scan,
  Download,
  Eye,
  Calendar,
  User,
  Hospital,
  Pill,
  Activity,
  Image,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Records = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockRecords = [
    {
      id: 1,
      title: "Blood Test Results",
      type: "Lab Report",
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      hospital: "City General Hospital",
      category: "lab",
      size: "2.3 MB",
      thumbnail: "/api/placeholder/100/100"
    },
    {
      id: 2,
      title: "Chest X-Ray",
      type: "Radiology",
      date: "2024-01-10",
      doctor: "Dr. Michael Chen",
      hospital: "MediCare Center",
      category: "imaging",
      size: "5.1 MB",
      thumbnail: "/api/placeholder/100/100"
    },
    {
      id: 3,
      title: "Prescription - Antibiotics",
      type: "Prescription",
      date: "2024-01-08",
      doctor: "Dr. Emily Rodriguez",
      hospital: "Health Plus Clinic",
      category: "prescription",
      size: "1.2 MB",
      thumbnail: "/api/placeholder/100/100"
    },
    {
      id: 4,
      title: "Vaccination Record",
      type: "Immunization",
      date: "2023-12-20",
      doctor: "Dr. David Kumar",
      hospital: "Community Health Center",
      category: "vaccination",
      size: "800 KB",
      thumbnail: "/api/placeholder/100/100"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Records', icon: FileText, count: 12 },
    { id: 'lab', label: 'Lab Reports', icon: Activity, count: 4 },
    { id: 'imaging', label: 'Imaging', icon: Image, count: 3 },
    { id: 'prescription', label: 'Prescriptions', icon: Pill, count: 3 },
    { id: 'vaccination', label: 'Vaccinations', icon: User, count: 2 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lab': return 'bg-primary/10 text-primary';
      case 'imaging': return 'bg-trust-blue/10 text-trust-blue';
      case 'prescription': return 'bg-healing-green/10 text-healing-green';
      case 'vaccination': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-secondary">
      {/* Header */}
      <header className="bg-surface/95 backdrop-blur-sm border-b border-border shadow-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-medical-green to-healing-green">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">My Records</h1>
              <p className="text-xs text-muted-foreground">Your complete medical history</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-card border-0 hover:shadow-floating transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary to-trust-blue flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Upload Files</h3>
              <p className="text-sm text-muted-foreground">Upload photos or documents</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 hover:shadow-floating transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-healing-green to-medical-green-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Scan Documents</h3>
              <p className="text-sm text-muted-foreground">Use camera to scan reports</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 hover:shadow-floating transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-trust-blue to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Hospital className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Sync from Hospital</h3>
              <p className="text-sm text-muted-foreground">Connect with healthcare providers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-0 sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className="w-full justify-between text-left hover:bg-accent"
                      size="sm"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </div>
                      <span className="text-xs">{category.count}</span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Records List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <Card className="shadow-card border-0 mb-6">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search records, doctors, or hospitals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="grid" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRecords.map((record) => (
                  <Card key={record.id} className="shadow-card border-0 hover:shadow-floating transition-all duration-300 group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-16 h-16 bg-accent/50 rounded-lg flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {record.title}
                          </h3>
                          <Badge className={getCategoryColor(record.category)} variant="secondary">
                            {record.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>{record.doctor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hospital className="h-3 w-3" />
                          <span>{record.hospital}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="medical" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="list" className="space-y-3">
                {mockRecords.map((record) => (
                  <Card key={record.id} className="shadow-card border-0 hover:shadow-floating transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                              {record.title}
                            </h3>
                            <span className="text-xs text-muted-foreground">{record.size}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge className={getCategoryColor(record.category)} variant="secondary">
                              {record.type}
                            </Badge>
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                            <span>{record.doctor}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="medical" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Empty State / Add New */}
        <Card className="shadow-card border-0 mt-8">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Add Your First Medical Record</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start building your complete health history by uploading your medical documents
            </p>
            <Button variant="medical">
              <Plus className="h-4 w-4 mr-2" />
              Add New Record
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Records;