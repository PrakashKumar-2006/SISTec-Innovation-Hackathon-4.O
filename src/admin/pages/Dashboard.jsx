import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { analyticsService } from '../services/analytics.service';
import { PageHeader } from '../components/navigation/PageHeader';
import {
  Users,
  CheckCircle,
  Clock,
  IndianRupee,
  FileText,
  MessageSquare,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { format } from 'date-fns';

const COLORS = ['#D8AB55', '#2DD4BF', '#F43F5E', '#A855F7', '#3B82F6'];
const STATUS_COLORS = {
  Verified: '#2DD4BF',
  Pending: '#D8AB55',
  Rejected: '#F43F5E'
};

export default function Dashboard() {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: analyticsService.getDashboardAnalytics,
    refetchInterval: 60000, // refresh every minute
    retry: 2
  });

  const analytics = response?.data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse pb-12">
        <div className="h-10 bg-brand-dark rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-brand-dark rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="h-[300px] bg-brand-dark rounded-xl"></div>
          <div className="h-[300px] bg-brand-dark rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <div className="p-8 text-center text-destructive bg-brand-card rounded-xl border border-destructive/20 flex flex-col items-center justify-center min-h-[300px]">
        <ShieldAlert className="h-12 w-12 mb-4 text-destructive" />
        <h3 className="text-xl font-bold mb-2">Error loading analytics</h3>
        <p className="mb-4">Could not fetch dashboard data. Please try again later.</p>
        <button 
          onClick={() => refetch()} 
          className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded hover:bg-destructive/20 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { counts, registrationTrend, themeDistribution, statusDistribution, recentActivity } = analytics;

  const statCards = [
    { title: 'Total Registrations', value: counts.totalRegistrations, icon: Users, color: 'text-brand-teal' },
    { title: 'Verified Teams', value: counts.verifiedRegistrations, icon: CheckCircle, color: 'text-brand-gold' },
    { title: 'Pending Approval', value: counts.pendingRegistrations, icon: Clock, color: 'text-orange-400' },
    { title: 'Total Revenue', value: `₹${counts.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-400' },
    { title: 'Active Problems', value: counts.activeProblems, icon: FileText, color: 'text-blue-400' },
    { title: 'Pending Requests', value: counts.pendingChangeRequests, icon: MessageSquare, color: 'text-brand-purple' },
  ];

  return (
    <div className="space-y-6 pb-12 overflow-x-hidden">
      <PageHeader 
        title="Admin Dashboard" 
        description="Overview of hackathon registrations, revenue, and recent activities." 
      />

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-brand-card border border-brand-purple/20 p-6 rounded-xl shadow-card-shadow flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-gray font-medium uppercase tracking-wider">{stat.title}</p>
                <p className="text-3xl font-bold text-brand-text mt-2">{stat.value}</p>
              </div>
              <div className={`p-4 bg-brand-dark rounded-xl ${stat.color} border border-brand-purple/10`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Trend Chart */}
        <div className="lg:col-span-2 bg-brand-card border border-brand-purple/20 rounded-xl p-5 shadow-card-shadow">
          <h3 className="text-lg font-semibold text-brand-gold mb-4">Registration Trend (Last 7 Days)</h3>
          <div className="h-[300px] w-full">
            {registrationTrend && registrationTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={registrationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D8AB55" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D8AB55" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="_id" stroke="#ffffff50" fontSize={12} tickMargin={10} />
                  <YAxis stroke="#ffffff50" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#131316', borderColor: '#4A3B69', borderRadius: '8px' }}
                    itemStyle={{ color: '#D8AB55' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#D8AB55" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-brand-gray">No registration data for the last 7 days.</div>
            )}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-brand-card border border-brand-purple/20 rounded-xl p-5 shadow-card-shadow">
          <h3 className="text-lg font-semibold text-brand-gold mb-4">Registration Status</h3>
          <div className="h-[300px] w-full flex flex-col items-center justify-center">
            {statusDistribution && statusDistribution.some(s => s.count > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="_id"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry._id] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#131316', borderColor: '#4A3B69', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-brand-gray">No data available</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Distribution */}
        <div className="bg-brand-card border border-brand-purple/20 rounded-xl p-5 shadow-card-shadow">
          <h3 className="text-lg font-semibold text-brand-gold mb-4">Theme Distribution</h3>
          <div className="h-[300px] w-full">
            {themeDistribution && themeDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={themeDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                  <XAxis type="number" stroke="#ffffff50" fontSize={12} />
                  <YAxis dataKey="_id" type="category" stroke="#ffffff50" fontSize={12} width={100} />
                  <Tooltip 
                    cursor={{fill: '#ffffff05'}}
                    contentStyle={{ backgroundColor: '#131316', borderColor: '#4A3B69', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#2DD4BF" radius={[0, 4, 4, 0]}>
                    {themeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-brand-gray">No theme data available.</div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-brand-card border border-brand-purple/20 rounded-xl p-5 shadow-card-shadow overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-brand-gold">Recent Activity</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={`${activity.id}-${index}`} className="flex items-start gap-4 p-3 rounded-lg hover:bg-brand-dark/50 transition-colors border border-transparent hover:border-brand-purple/10">
                    <div className={`p-2 rounded-full ${activity.type === 'Registration' ? 'bg-brand-teal/20 text-brand-teal' : 'bg-brand-gold/20 text-brand-gold'}`}>
                      {activity.type === 'Registration' ? <Users className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-text truncate">
                        {activity.user}
                      </p>
                      <p className="text-xs text-brand-gray truncate">
                        {activity.action} • {activity.status}
                      </p>
                    </div>
                    <div className="text-xs text-brand-gray whitespace-nowrap">
                      {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-brand-gray">No recent activity.</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-brand-dark p-6 rounded-xl border border-brand-purple/20">
        <h3 className="text-lg font-semibold text-brand-text mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/teams" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-brand-card border border-brand-purple/30 text-brand-text hover:bg-brand-purple/10 hover:text-brand-gold transition-colors">
            Manage Teams <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/admin/problems" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-brand-card border border-brand-purple/30 text-brand-text hover:bg-brand-purple/10 hover:text-brand-gold transition-colors">
            Problem Statements <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/admin/requests" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-brand-card border border-brand-purple/30 text-brand-text hover:bg-brand-purple/10 hover:text-brand-gold transition-colors">
            Review Requests <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
