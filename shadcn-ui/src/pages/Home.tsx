import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  BookOpen, 
  BookText, 
  LineChart, 
  ArrowRight,
  HeartPulse,
  BrainCircuit,
  Pill,
  Microscope,
  Stethoscope,
  Baby
} from 'lucide-react';

const Home: React.FC = () => {
  // Featured categories with icons
  const featuredCategories = [
    { name: 'Anatomy', icon: <HeartPulse className="h-5 w-5 mr-2" />, description: 'Study the structure of human body systems' },
    { name: 'Physiology', icon: <BrainCircuit className="h-5 w-5 mr-2" />, description: 'Learn how body systems function' },
    { name: 'Pharmacology', icon: <Pill className="h-5 w-5 mr-2" />, description: 'Explore drug mechanisms and effects' },
    { name: 'Pathology', icon: <Microscope className="h-5 w-5 mr-2" />, description: 'Understand disease processes' },
    { name: 'Medicine', icon: <Stethoscope className="h-5 w-5 mr-2" />, description: 'Clinical approaches to patient care' },
    { name: 'Pediatrics', icon: <Baby className="h-5 w-5 mr-2" />, description: 'Medical care for infants and children' }
  ];

  return (
    <div className="container mx-auto py-6 space-y-10">
      {/* Hero Section */}
      <section className="py-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
            ReviseRx
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Your comprehensive medical education platform with 1000+ Q&A per topic covering the entire MBBS curriculum
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/topics">
              <Button size="lg" className="gap-2">
                Explore Topics <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="gap-2">
                Ask Questions <MessageCircle className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ask questions in natural language and get instant medical knowledge from our comprehensive database.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/chat">
                <Button variant="ghost" size="sm" className="gap-1">
                  Try it <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Feature Card 2 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Topic Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Browse our extensive library of medical topics organized by categories with 1000+ Q&A per topic.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/topics">
                <Button variant="ghost" size="sm" className="gap-1">
                  Explore <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Feature Card 3 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BookText className="h-5 w-5 mr-2" />
                Medical Glossary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Quick reference for medical terminology with definitions and related terms.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/glossary">
                <Button variant="ghost" size="sm" className="gap-1">
                  View Terms <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCategories.map((category, index) => (
            <Link to={`/topics?category=${category.name}`} key={index}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    {category.icon}
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6">Track Your Progress</h2>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-medium">Monitor your learning journey</h3>
                <p className="text-muted-foreground">
                  Keep track of your study sessions, monitor your performance across different topics,
                  and identify areas for improvement.
                </p>
                <Link to="/progress">
                  <Button className="mt-2 gap-2">
                    View Progress <LineChart className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex-shrink-0 hidden md:block">
                <LineChart className="h-32 w-32 text-blue-500 opacity-50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;