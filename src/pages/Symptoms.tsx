import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, 
  MicOff, 
  Send, 
  Stethoscope, 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Info,
  Thermometer,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  const handleAnalyze = () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const mockAnalysis = {
    severity: 'moderate',
    possibleConditions: [
      { name: 'Upper Respiratory Infection', probability: 75, description: 'Common cold or flu symptoms' },
      { name: 'Seasonal Allergies', probability: 60, description: 'Allergic reaction to environmental factors' },
      { name: 'Sinusitis', probability: 40, description: 'Inflammation of the sinuses' }
    ],
    recommendations: [
      'Rest and stay hydrated',
      'Consider over-the-counter pain relievers',
      'Monitor symptoms for 24-48 hours',
      'Consult a doctor if symptoms worsen'
    ],
    urgency: 'routine',
    nextSteps: 'Schedule a routine consultation with your primary care physician'
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return CheckCircle;
      case 'moderate': return Info;
      case 'high': return AlertCircle;
      default: return Info;
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
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-trust-blue">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Symptom Checker</h1>
              <p className="text-xs text-muted-foreground">AI-powered health analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!analysisComplete ? (
          <div className="space-y-6">
            {/* Input Section */}
            <Card className="shadow-floating border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Describe Your Symptoms
                </CardTitle>
                <CardDescription>
                  Tell us what you're experiencing. You can type or use voice input for better accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Describe your symptoms in detail... (e.g., 'I have a headache, runny nose, and feel tired for the past 2 days')"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-32 pr-12"
                  />
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={handleVoiceToggle}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                
                {isRecording && (
                  <div className="flex items-center gap-2 text-destructive">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    <span className="text-sm">Recording... Speak clearly</span>
                  </div>
                )}

                <Button 
                  onClick={handleAnalyze} 
                  variant="medical" 
                  className="w-full" 
                  size="lg"
                  disabled={!symptoms.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-card border-0">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2">💡 Tips for better analysis:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Include when symptoms started</li>
                  <li>• Describe severity (mild, moderate, severe)</li>
                  <li>• Mention any triggers or patterns</li>
                  <li>• Include current medications if relevant</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Analysis Results */}
            <Card className="shadow-floating border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  Based on your symptoms, here's our AI assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Severity Level */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                  <div className={`p-2 rounded-full ${getSeverityColor(mockAnalysis.severity)}`}>
                    {(() => {
                      const Icon = getSeverityIcon(mockAnalysis.severity);
                      return <Icon className="h-5 w-5" />;
                    })()}
                  </div>
                  <div>
                    <p className="font-semibold">Severity Level: {mockAnalysis.severity.charAt(0).toUpperCase() + mockAnalysis.severity.slice(1)}</p>
                    <p className="text-sm text-muted-foreground">Urgency: {mockAnalysis.urgency}</p>
                  </div>
                </div>

                <Separator />

                {/* Possible Conditions */}
                <div>
                  <h3 className="font-semibold mb-3">Possible Conditions</h3>
                  <div className="space-y-3">
                    {mockAnalysis.possibleConditions.map((condition, index) => (
                      <div key={index} className="p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{condition.name}</span>
                          <Badge variant="secondary">{condition.probability}% match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {mockAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Next Steps */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Next Steps
                  </h3>
                  <p className="text-sm mb-4">{mockAnalysis.nextSteps}</p>
                  <div className="flex gap-3">
                    <Link to="/hospitals">
                      <Button variant="medical" size="sm">
                        Find Hospital
                      </Button>
                    </Link>
                    <Link to="/telemedicine">
                      <Button variant="outline" size="sm">
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-xs text-muted-foreground">
                    ⚠️ This analysis is for informational purposes only and should not replace professional medical advice. 
                    If you have severe symptoms or concerns, please consult a healthcare professional immediately.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAnalysisComplete(false);
                      setSymptoms('');
                    }}
                    className="flex-1"
                  >
                    New Analysis
                  </Button>
                  <Link to="/records" className="flex-1">
                    <Button variant="healing" className="w-full">
                      Save to Records
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Symptoms;