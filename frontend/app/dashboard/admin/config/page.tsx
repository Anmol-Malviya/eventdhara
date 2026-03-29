'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Save, ToggleLeft, ToggleRight, IndianRupee, Clock, AlertTriangle, Shield } from 'lucide-react';

type ToggleSetting = { id: string; label: string; desc: string; enabled: boolean };
type InputSetting = { id: string; label: string; desc: string; value: string; suffix?: string };

const INITIAL_TOGGLES: ToggleSetting[] = [
  { id: 'new_leads',         label: 'Enable New Lead Distribution',     desc: 'Distribute fresh leads to matched vendors automatically.',          enabled: true  },
  { id: 'wa_bot',            label: 'WhatsApp Bot Active',              desc: 'Allow the WA bot to receive and respond to messages.',               enabled: true  },
  { id: 'vendor_register',   label: 'Vendor Self-Registration',         desc: 'Allow vendors to register themselves via the website.',              enabled: true  },
  { id: 'bidding',           label: 'Bidding System',                   desc: 'Allow vendors to submit bids on eligible leads.',                    enabled: false },
  { id: 'manual_orders',     label: 'Manual Orders (Admin Only)',       desc: 'Allow admins to create orders without the online flow.',             enabled: true  },
  { id: 'ai_image_gen',      label: 'AI Image Generator',              desc: 'Enable AI-generated decoration preview images for users.',           enabled: false },
  { id: 'maintenance_mode',  label: 'Maintenance Mode',                 desc: '⚠️ Disables all public pages and shows maintenance banner.',         enabled: false },
];

const INITIAL_INPUTS: InputSetting[] = [
  { id: 'commission_rate',   label: 'Platform Commission Rate',         desc: 'Percentage taken from each completed order.',  value: '10', suffix: '%'     },
  { id: 'lead_timeout',      label: 'Lead Accept Timeout',              desc: 'Minutes a vendor has to accept a lead.',        value: '20', suffix: 'min'   },
  { id: 'max_leads_day',     label: 'Max Leads per Vendor/Day',         desc: 'Cap on simultaneous leads per vendor.',         value: '5',  suffix: 'leads' },
  { id: 'min_order_amount',  label: 'Minimum Order Amount',             desc: 'Minimum bookable amount.',                      value: '500', suffix: '₹'   },
];

export default function AdminConfigPage() {
  const [toggles, setToggles] = useState(INITIAL_TOGGLES);
  const [inputs, setInputs] = useState(INITIAL_INPUTS);
  const [saved, setSaved] = useState(false);

  const handleToggle = (id: string) => {
    setToggles(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
    setSaved(false);
  };

  const handleInput = (id: string, value: string) => {
    setInputs(prev => prev.map(i => i.id === id ? { ...i, value } : i));
    setSaved(false);
  };

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
  };

  const maintenanceOn = toggles.find(t => t.id === 'maintenance_mode')?.enabled;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Platform Config</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Global system settings and feature flags.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium">✓ Saved</span>}
          <Button onClick={handleSave} className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
        </div>
      </div>

      {maintenanceOn && (
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-red-700">⚠️ Maintenance Mode is ON</strong>
            <p className="text-sm text-red-600 mt-0.5">The platform is currently inaccessible to the public. Turn this off to restore access.</p>
          </div>
        </div>
      )}

      {/* Numeric Settings */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className="font-semibold">Business Rules</h2>
        </div>
        <CardContent className="p-6 space-y-5">
          {inputs.map(input => (
            <div key={input.id}>
              <label className="text-sm font-medium text-[var(--color-text)] block mb-1">{input.label}</label>
              <p className="text-xs text-gray-400 mb-2">{input.desc}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={input.value}
                  onChange={e => handleInput(input.id, e.target.value)}
                  className="w-28 px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                />
                {input.suffix && (
                  <span className="text-sm text-gray-400 font-medium">{input.suffix}</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
          <Settings className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className="font-semibold">Feature Flags</h2>
        </div>
        <CardContent className="p-0 divide-y divide-[var(--color-border)]">
          {toggles.map(t => (
            <div key={t.id} className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors ${t.id === 'maintenance_mode' && t.enabled ? 'bg-red-50' : ''}`}>
              <div className="flex-1 pr-4">
                <p className={`text-sm font-medium ${t.id === 'maintenance_mode' && t.enabled ? 'text-red-700' : 'text-[var(--color-text)]'}`}>{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </div>
              <button
                onClick={() => handleToggle(t.id)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                  t.enabled ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {t.enabled
                  ? <ToggleRight className="w-8 h-8 text-green-500" />
                  : <ToggleLeft className="w-8 h-8 text-gray-300" />
                }
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className="font-semibold">Security</h2>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Rotate JWT Secret</p>
              <p className="text-xs text-gray-400">Forces all users to log in again. Use only in an emergency.</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Rotate</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Clear Session Cache</p>
              <p className="text-xs text-gray-400">Flushes all active sessions.</p>
            </div>
            <Button variant="outline" size="sm">Clear</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Export System Audit Log</p>
              <p className="text-xs text-gray-400">Download the last 30 days of admin actions.</p>
            </div>
            <Button variant="outline" size="sm">Export CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
