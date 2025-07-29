import React from 'react';
import { useReviseRx } from '@/context/ReviseRxContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressIndicator } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format } from 'date-fns';
import { Clock, Activity, BookCheck, BarChart3, BookOpen } from 'lucide-react';

// Sample progress data (in a real app, this would come from the context)
const sampleSessionsData = [
  { date: '2025-07-21', topics: 3, questionsAttempted: 45, questionsCorrect: 32, timeSpent: 62 },
  { date: '2025-07-22', topics: 2, questionsAttempted: 30, questionsCorrect: 25, timeSpent: 45 },
  { date: '2025-07-23', topics: 4, questionsAttempted: 55, questionsCorrect: 40, timeSpent: 75 },
  { date: '2025-07-24', topics: 2, questionsAttempted: 28, questionsCorrect: 20, timeSpent: 40 },
  { date: '2025-07-25', topics: 5, questionsAttempted: 65, questionsCorrect: 55, timeSpent: 90 },
  { date: '2025-07-26', topics: 3, questionsAttempted: 42, questionsCorrect: 36, timeSpent: 65 },
  { date: '2025-07-27', topics: 4, questionsAttempted: 52, questionsCorrect: 41, timeSpent: 80 },
];

const sampleTopicsProgress = [
  { name: 'Cardiovascular System', questionsAttempted: 125, questionsCorrect: 98, progress: 78 },
  { name: 'Respiratory System', questionsAttempted: 95, questionsCorrect: 72, progress: 76 },
  { name: 'Glucose Metabolism', questionsAttempted: 85, questionsCorrect: 58, progress: 68 },
  { name: 'Antibiotics', questionsAttempted: 110, questionsCorrect: 87, progress: 79 },
  { name: 'Infectious Diseases', questionsAttempted: 75, questionsCorrect: 45, progress: 60 },
  { name: 'Obstetrics', questionsAttempted: 65, questionsCorrect: 42, progress: 65 },
];

const categoryProgress = [
  { name: 'Anatomy', value: 85 },
  { name: 'Physiology', value: 72 },
  { name: 'Biochemistry', value: 65 },
  { name: 'Pathology', value: 58 },
  { name: 'Pharmacology', value: 75 },
  { name: 'Medicine', value: 60 },
];

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'];

const Progress: React.FC = () => {
  const { userProgress, topics } = useReviseRx();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Learning Progress</h1>
        <p className="text-muted-foreground">
          Track your study sessions and monitor your performance
        </p>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Study Time</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              457 minutes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Last 7 days: +80 minutes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Topics Covered</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
              6 topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              50% of categories explored
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Questions Attempted</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Activity className="h-5 w-5 mr-2 text-violet-500" />
              555 questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Last 7 days: +52 questions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Score</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <BookCheck className="h-5 w-5 mr-2 text-pink-500" />
              72%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Last 7 days: +5%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Topics Progress</TabsTrigger>
          <TabsTrigger value="sessions">Study Sessions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Daily Progress Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>
                  Your study activity over the past 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sampleSessionsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                      />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value, name) => [value, name === 'timeSpent' ? 'Minutes' : 'Questions']}
                        labelFormatter={(date) => format(new Date(date as string), 'MMMM dd, yyyy')}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="questionsAttempted"
                        name="Questions Attempted"
                        stroke="#6366f1"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="questionsCorrect"
                        name="Questions Correct"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="timeSpent"
                        name="Time Spent (min)"
                        stroke="#8b5cf6"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Category Progress</CardTitle>
                <CardDescription>
                  Your mastery level across different categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryProgress}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryProgress.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Mastery Level']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest study sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleSessionsData.slice(0, 3).map((session, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Studied {session.topics} {session.topics === 1 ? 'topic' : 'topics'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(session.date), 'MMMM dd, yyyy')}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <span>
                            {session.questionsCorrect}/{session.questionsAttempted} correct
                          </span>
                          <span>{session.timeSpent} minutes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Topics Progress Tab */}
        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Topics Mastery</CardTitle>
              <CardDescription>
                Track your progress across different medical topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sampleTopicsProgress.map((topic, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{topic.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {topic.questionsCorrect}/{topic.questionsAttempted} correct ({topic.progress}%)
                      </div>
                    </div>
                    <ProgressIndicator value={topic.progress} className="h-2" />
                  </div>
                ))}
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sampleTopicsProgress}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="questionsAttempted" name="Questions Attempted" fill="#6366f1" />
                      <Bar dataKey="questionsCorrect" name="Questions Correct" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Sessions Tab */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Study History</CardTitle>
                  <CardDescription>
                    Detailed record of your past study sessions
                  </CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="font-medium text-left p-2 pl-4">Date</th>
                      <th className="font-medium text-left p-2">Topics</th>
                      <th className="font-medium text-left p-2">Questions</th>
                      <th className="font-medium text-left p-2">Score</th>
                      <th className="font-medium text-left p-2">Time (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleSessionsData.map((session, index) => (
                      <tr key={index} className={index % 2 ? 'bg-muted/20' : ''}>
                        <td className="p-2 pl-4">{format(new Date(session.date), 'MMM dd, yyyy')}</td>
                        <td className="p-2">{session.topics}</td>
                        <td className="p-2">{session.questionsAttempted}</td>
                        <td className="p-2">
                          {Math.round((session.questionsCorrect / session.questionsAttempted) * 100)}%
                        </td>
                        <td className="p-2">{session.timeSpent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;