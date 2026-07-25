'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Library, BookOpen, Star, Plus, CheckCircle2, Bookmark } from 'lucide-react';

export const BooksView: React.FC = () => {
  const { books, updateBookProgress } = useApp();
  const [selectedBookId, setSelectedBookId] = useState<string>(books[0]?.id || 'b1');

  const selectedBook = books.find((b) => b.id === selectedBookId) || books[0];

  const handlePagesUpdate = (pages: number) => {
    updateBookProgress(selectedBook.id, pages);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#4F8CFF]">
            <Library className="w-3.5 h-3.5" />
            <span>KNOWLEDGE ARCHIVE & BOOKS</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Curated Non-Fiction Library & Deep Highlights
          </h2>
          <p className="text-xs text-[#8A8A8A]">
            Track reading progress, save high-impact quotes, and distill technical notes.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-[#090909] border border-[#232323] p-3 rounded-[12px]">
          <div className="text-right font-mono">
            <p className="text-[10px] text-[#8A8A8A]">Books Completed</p>
            <p className="text-base font-bold text-white">
              {books.filter((b) => b.status === 'completed').length} / {books.length} Books
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Books List + Book Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Books Shelf */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider px-1">
            Active Reading Shelf
          </h3>

          <div className="space-y-2.5">
            {books.map((book) => {
              const isSelected = book.id === selectedBookId;
              const progressPct = Math.round((book.pagesRead / book.totalPages) * 100);

              return (
                <div
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  className={`p-4 rounded-[12px] border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#181818] border-[#4F8CFF]'
                      : 'bg-[#111111] border-[#232323] hover:border-[#333333]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#4F8CFF]">{book.category}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        book.status === 'completed'
                          ? 'bg-[#16C784]/10 text-[#16C784] border-[#16C784]/20'
                          : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-1">{book.title}</h4>
                  <p className="text-xs text-[#8A8A8A]">{book.author}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#8A8A8A]">
                      {book.pagesRead} / {book.totalPages} pages
                    </span>
                    <span className="text-white font-bold">{progressPct}%</span>
                  </div>
                  <div className="w-full bg-[#090909] h-1.5 rounded-full overflow-hidden border border-[#232323] mt-1">
                    <div
                      className="bg-[#4F8CFF] h-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Book Details & Notes */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-6">
          <div className="border-b border-[#232323] pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#4F8CFF] uppercase font-semibold">
                {selectedBook.category}
              </span>
              <div className="flex items-center space-x-1 text-[#F59E0B]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold font-mono">{selectedBook.rating} / 5</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">{selectedBook.title}</h3>
            <p className="text-xs font-medium text-[#8A8A8A]">By {selectedBook.author}</p>

            {/* Quick Page Update Controls */}
            <div className="pt-3 flex items-center space-x-3 text-xs">
              <span className="text-[#8A8A8A] font-medium">Update Progress:</span>
              <input
                type="number"
                value={selectedBook.pagesRead}
                onChange={(e) => handlePagesUpdate(Number(e.target.value))}
                className="w-24 bg-[#090909] border border-[#232323] rounded-[8px] p-1.5 text-white font-mono text-center outline-none focus:border-[#4F8CFF]"
              />
              <span className="text-[#8A8A8A] font-mono">/ {selectedBook.totalPages} Pages</span>
            </div>
          </div>

          {/* Key Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Distilled Executive Notes
            </h4>
            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] text-xs text-white leading-relaxed font-mono">
              {selectedBook.keyNotes}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
              <Bookmark className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Saved Key Highlights</span>
            </h4>

            <div className="space-y-2">
              {selectedBook.highlights.map((quote, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#090909] border border-[#232323] rounded-[8px] text-xs text-[#8A8A8A] italic leading-relaxed border-l-2 border-l-[#4F8CFF]"
                >
                  "{quote}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
