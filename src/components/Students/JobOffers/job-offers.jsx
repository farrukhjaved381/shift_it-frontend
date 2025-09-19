"use client"

import React from "react"
import { Briefcase, Clock, Bell } from "lucide-react"

export default function JobOffersModule({ jobOffers = [], onNotifyRequest, className }) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className || ""}`}>
      <div className="max-w-7xl mx-auto">
        {/* Top Header (left aligned, with divider) */}
        <header className="px-6 py-6 border-b border-gray-200 bg-white">
          <h1 className="text-2xl font-semibold text-gray-900">Job Offers</h1>
          <p className="text-sm text-gray-500 mt-1">Explore career opportunities in healthcare</p>
        </header>

        {/* Centered Card */}
        <main className="min-h-[60vh] flex items-start justify-center pt-12 pb-16">
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg">
            <div className="text-center pb-6 px-8 pt-8">
              <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-blue-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Job Offers Coming Soon</h2>
              <p className="text-lg text-gray-500">
                We're working hard to bring you the best job opportunities in healthcare
              </p>
            </div>

            <div className="text-center space-y-6 px-8 pb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <Clock className="h-5 w-5" />
                  <span>Feature launching soon</span>
                </div>

                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Our job offers platform will connect you with top healthcare employers and help you find the
                  perfect position after graduation.
                </p>
              </div>

              <div className="pt-4">
                <button
                  className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={onNotifyRequest}
                >
                  <Bell className="h-4 w-4" />
                  Notify Me When Available
                </button>
              </div>

              <div className="text-xs text-gray-500">Expected launch: Q2 2024</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
