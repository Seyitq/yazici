'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineMail, HiOutlineCheck, HiOutlineTrash } from 'react-icons/hi'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  is_read: number
  created_at: string
}

export default function AdminMesajlarPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Mesajlar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const selectedContact = contacts.find((c) => c.id === selectedId)

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Mesajlar</h1>

      {loading ? (
        <div className="text-gray-500 text-center py-10">Yükleniyor...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 border border-gray-700 rounded-xl">
          <HiOutlineMail className="mx-auto text-gray-600 mb-3" size={40} />
          <p className="text-gray-500">Henüz mesaj gelmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedId(contact.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedId === contact.id
                    ? 'bg-gray-800 border-neon/30'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm truncate">
                    {contact.name}
                  </span>
                  {!contact.is_read && (
                    <span className="w-2 h-2 rounded-full bg-neon shrink-0" />
                  )}
                </div>
                <p className="text-gray-600 text-xs truncate">
                  {contact.subject || contact.message}
                </p>
                <p className="text-gray-700 text-xs mt-1">
                  {new Date(contact.created_at).toLocaleDateString('tr-TR')}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {selectedContact.name}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      {selectedContact.email && (
                        <span>{selectedContact.email}</span>
                      )}
                      {selectedContact.phone && (
                        <span>{selectedContact.phone}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-600 text-xs">
                    {new Date(selectedContact.created_at).toLocaleString('tr-TR')}
                  </span>
                </div>

                {selectedContact.subject && (
                  <div className="mb-4">
                    <span className="text-xs text-gray-600">Konu:</span>
                    <p className="text-white text-sm font-medium">
                      {selectedContact.subject}
                    </p>
                  </div>
                )}

                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>

                <div className="flex gap-3">
                  {selectedContact.email && (
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="btn-primary text-sm !py-2 !px-4"
                    >
                      E-posta Gönder
                    </a>
                  )}
                  {selectedContact.phone && (
                    <a
                      href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-sm !py-2 !px-4"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                <HiOutlineMail className="mx-auto text-gray-600 mb-3" size={32} />
                <p className="text-gray-500 text-sm">
                  Bir mesaj seçin
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
