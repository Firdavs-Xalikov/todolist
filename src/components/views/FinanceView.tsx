'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Wallet, TrendingUp, DollarSign, PieChart, ShieldCheck, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const FinanceView: React.FC = () => {
  const { finance, addTransaction } = useApp();
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState(500);
  const [txType, setTxType] = useState<'income' | 'expense'>('income');
  const [txCategory, setTxCategory] = useState('Engineering');

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txTitle.trim()) return;
    addTransaction({
      id: `tx-${Date.now()}`,
      title: txTitle,
      amount: txAmount,
      type: txType,
      category: txCategory,
      date: new Date().toISOString().split('T')[0],
    });
    setTxTitle('');
    setIsAddTxOpen(false);
  };

  const netWorthPercentage = Math.round((finance.netWorth / finance.netWorthTargetAge25) * 100);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Net Worth Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#16C784]">
              <Wallet className="w-3.5 h-3.5" />
              <span>SOVEREIGN WEALTH & ASSET MANAGEMENT</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-mono tracking-tight">
              ${finance.netWorth.toLocaleString()} USD
            </h2>
            <p className="text-xs text-[#8A8A8A]">
              Targeting $1,000,000 Net Worth by Age 25 (2032). Current savings rate: {finance.savingsRate}%.
            </p>
          </div>

          <button
            onClick={() => setIsAddTxOpen(true)}
            className="px-4 py-2 bg-[#16C784] hover:bg-[#13b074] text-black font-semibold text-xs rounded-[8px] flex items-center space-x-2 transition-colors self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Progress Bar to 1M Goal */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#8A8A8A]">Progress to $1,000,000 Milestone</span>
            <span className="text-[#16C784] font-bold">{netWorthPercentage}% ($48.5k / $1M)</span>
          </div>
          <div className="w-full bg-[#090909] h-2 rounded-full overflow-hidden border border-[#232323]">
            <div
              className="bg-[#16C784] h-full transition-all duration-300"
              style={{ width: `${Math.max(netWorthPercentage, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <span className="text-[11px] text-[#8A8A8A] font-medium">Monthly Income</span>
          <p className="text-xl font-mono font-bold text-white">
            ${finance.monthlyIncome.toLocaleString()}
          </p>
          <p className="text-[10px] text-[#16C784]">+12% vs last month</p>
        </div>

        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <span className="text-[11px] text-[#8A8A8A] font-medium">Monthly Expenses</span>
          <p className="text-xl font-mono font-bold text-white">
            ${finance.monthlyExpenses.toLocaleString()}
          </p>
          <p className="text-[10px] text-[#8A8A8A]">Budget Cap: ${finance.monthlyBudget}</p>
        </div>

        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <span className="text-[11px] text-[#8A8A8A] font-medium">Savings Rate</span>
          <p className="text-xl font-mono font-bold text-[#16C784]">{finance.savingsRate}%</p>
          <p className="text-[10px] text-[#16C784]">High Velocity</p>
        </div>

        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <span className="text-[11px] text-[#8A8A8A] font-medium">Liquid Cash Reserve</span>
          <p className="text-xl font-mono font-bold text-white">$18,500</p>
          <p className="text-[10px] text-[#8A8A8A]">6 Months Emergency</p>
        </div>
      </div>

      {/* Asset Allocation & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Breakdown */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-5 space-y-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Asset Distribution & Holdings
          </h3>

          <div className="space-y-2">
            {finance.assets.map((asset, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#090909] border border-[#232323] rounded-[8px] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-white">{asset.name}</p>
                  <p className="text-[10px] text-[#8A8A8A] uppercase font-mono">{asset.category}</p>
                </div>
                <span className="font-mono font-bold text-white">
                  ${asset.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-5 space-y-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Recent Ledger Transactions
          </h3>

          <div className="space-y-2">
            {finance.transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 bg-[#090909] border border-[#232323] rounded-[8px] flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-7 h-7 rounded-[6px] flex items-center justify-center ${
                      tx.type === 'income'
                        ? 'bg-[#16C784]/10 text-[#16C784] border border-[#16C784]/20'
                        : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tx.title}</p>
                    <p className="text-[10px] text-[#8A8A8A]">{tx.date} • {tx.category}</p>
                  </div>
                </div>
                <span
                  className={`font-mono font-bold ${
                    tx.type === 'income' ? 'text-[#16C784]' : 'text-[#EF4444]'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isAddTxOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#232323] rounded-[12px] w-full max-w-md p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white">Record Ledger Transaction</h3>
            <form onSubmit={handleAddTx} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8A8A8A] mb-1 font-medium">Title</label>
                <input
                  type="text"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  placeholder="e.g. Freelance Consulting Payment"
                  className="w-full bg-[#090909] border border-[#232323] rounded-[8px] p-2.5 text-white outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8A8A8A] mb-1 font-medium">Amount ($ USD)</label>
                  <input
                    type="number"
                    value={txAmount}
                    onChange={(e) => setTxAmount(Number(e.target.value))}
                    className="w-full bg-[#090909] border border-[#232323] rounded-[8px] p-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8A8A8A] mb-1 font-medium">Type</label>
                  <select
                    value={txType}
                    onChange={(e) => setTxType(e.target.value as any)}
                    className="w-full bg-[#090909] border border-[#232323] rounded-[8px] p-2 text-white outline-none"
                  >
                    <option value="income">Income (+)</option>
                    <option value="expense">Expense (-)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxOpen(false)}
                  className="px-3 py-1.5 bg-[#181818] border border-[#232323] text-[#8A8A8A] rounded-[8px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#16C784] text-black font-semibold rounded-[8px]"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
