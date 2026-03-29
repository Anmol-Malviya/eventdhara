'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Wifi, WifiOff, RefreshCw, Bot, Send, Users, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const BOT_METRICS = [
  { label: 'Messages Today',    value: '284',  icon: MessageCircle, up: true,  delta: '+12',     color: 'text-blue-600',   bg: 'bg-blue-50' },
  { label: 'Active Sessions',   value: '18',   icon: Users,         up: null,  delta: 'live',    color: 'text-green-600',  bg: 'bg-green-50' },
  { label: 'Avg Response Time', value: '1.2s', icon: Clock,         up: true,  delta: 'faster',  color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Unanswered',        value: '3',    icon: AlertTriangle, up: false, delta: 'needs fix',color: 'text-red-600',   bg: 'bg-red-50' },
];

const RECENT_MSGS: { user: string; phone: string; message: string; botReply: string; time: string; status: 'success' | 'failed' | 'pending' }[] = [
  { user: 'Priya Sharma',  phone: '+91 98765 43210', message: 'Hi! I want to book birthday decoration for April 20', botReply: 'Great! Please share your city and budget 🎉', time: '2:14 PM', status: 'success' },
  { user: 'Amit Joshi',    phone: '+91 87654 32109', message: 'What are the available packages for wedding?',       botReply: 'We have 3 wedding packages starting at ₹15,000. Want details?', time: '1:52 PM', status: 'success' },
  { user: 'Komal Singh',   phone: '+91 76543 21098', message: 'My order status?',                                   botReply: 'Your order ORD-205 is Confirmed for April 28 ✅', time: '1:30 PM', status: 'success' },
  { user: 'Unknown',       phone: '+91 65432 10987', message: 'REFUND NOW',                                         botReply: '', time: '12:58 PM', status: 'failed' },
  { user: 'Deepak Pandey', phone: '+91 54321 09876', message: 'Can you provide catering also?',                     botReply: '⏳ Typing…', time: '12:45 PM', status: 'pending' },
];

const STATUS_ICON = {
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
  failed:  <XCircle className="w-4 h-4 text-red-500" />,
  pending: <Clock className="w-4 h-4 text-amber-500 animate-pulse" />,
};

export default function AdminBotMonitorPage() {
  const [botOnline, setBotOnline] = useState(true);
  const [restarting, setRestarting] = useState(false);

  const handleRestart = async () => {
    setRestarting(true);
    await new Promise(r => setTimeout(r, 2000));
    setRestarting(false);
    setBotOnline(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">WhatsApp Bot Monitor</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Live status and conversation log for the EventDhara WA bot.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${botOnline ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
            {botOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {botOnline ? 'Bot Online' : 'Bot Offline'}
          </div>
          <Button
            variant="outline"
            className="gap-2 text-sm"
            isLoading={restarting}
            onClick={handleRestart}
          >
            <RefreshCw className="w-4 h-4" /> Restart Bot
          </Button>
          <Button
            variant="ghost"
            className={`gap-2 text-sm ${botOnline ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
            onClick={() => setBotOnline(v => !v)}
          >
            {botOnline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            {botOnline ? 'Stop Bot' : 'Start Bot'}
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BOT_METRICS.map(m => (
          <Card key={m.label} className="border border-[var(--color-border)]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${m.bg} flex items-center justify-center shrink-0`}>
                <m.icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold">{m.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{m.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bot info */}
      <Card className={`border ${botOnline ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
        <CardContent className="p-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Bot className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">EventDhara WA Bot</h3>
              <p className="text-xs text-gray-500">Powered by Google Gemini AI · Connected as +91 79877 00201</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${botOnline ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-xs text-gray-500">{botOnline ? 'Connected & listening' : 'Disconnected'}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Uptime: 3d 14h 22m</p>
            <p className="text-xs text-gray-400">Last restart: Mar 25, 2026</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Conversations */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" /> Recent Conversations
          </h2>
        </div>
        <CardContent className="p-0 divide-y divide-[var(--color-border)]">
          {RECENT_MSGS.map((msg, i) => (
            <div key={i} className="p-5 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="font-semibold text-sm">{msg.user}</span>
                  <span className="text-xs text-gray-400 ml-2">{msg.phone}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {STATUS_ICON[msg.status]}
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="text-xs font-semibold text-gray-400 w-12 shrink-0 pt-1">User:</div>
                  <div className="bg-blue-50 rounded-lg px-3 py-2 text-sm text-gray-700 max-w-md">{msg.message}</div>
                </div>
                {msg.botReply && (
                  <div className="flex gap-2">
                    <div className="text-xs font-semibold text-gray-400 w-12 shrink-0 pt-1">Bot:</div>
                    <div className={`rounded-lg px-3 py-2 text-sm max-w-md ${msg.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-gray-700'}`}>
                      {msg.botReply}
                    </div>
                  </div>
                )}
                {msg.status === 'failed' && (
                  <div className="ml-14">
                    <Badge variant="danger" className="text-xs">Failed to respond — needs manual review</Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Manual send */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold">Manual Broadcast</h2>
        </div>
        <CardContent className="p-5 space-y-4">
          <p className="text-sm text-[var(--color-text-muted)]">Send a custom WhatsApp message to all active users or a specific phone number.</p>
          <textarea
            className="w-full text-sm border border-[var(--color-border)] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 resize-none"
            rows={3}
            placeholder="Type your broadcast message here…"
          />
          <div className="flex gap-3">
            <Button className="gap-2"><Send className="w-4 h-4" /> Send Broadcast</Button>
            <Button variant="outline" className="gap-2"><Users className="w-4 h-4" /> Preview Recipients</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}