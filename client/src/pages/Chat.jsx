import { useState } from 'react'

const conversations = [
  {
    id: 1,
    user: 'Lucía M.',
    product: 'Campera de cuero marrón',
    lastMessage: 'Hola! Sigue disponible?',
    time: '10:32',
    unread: 2,
    bg: 'bg-terracota',
  },
  {
    id: 2,
    user: 'Martina R.',
    product: 'Vestido floral midi',
    lastMessage: 'Perfecto, te mando el dinero ahora',
    time: 'Ayer',
    unread: 0,
    bg: 'bg-carbon-light',
  },
  {
    id: 3,
    user: 'Carolina P.',
    product: 'Blazer oversize gris',
    lastMessage: 'Me lo reservás hasta el viernes?',
    time: 'Lun',
    unread: 1,
    bg: 'bg-carbon',
  },
]

const messages = [
  { id: 1, text: 'Hola! Sigue disponible la campera?', mine: false, time: '10:30' },
  { id: 2, text: 'Sí! Está disponible. La tengo acá en Palermo.', mine: true, time: '10:31' },
  { id: 3, text: 'Genial! Podés hacer una rebaja? Ofrezco $7.500', mine: false, time: '10:32' },
  { id: 4, text: 'Hola! Sigue disponible?', mine: false, time: '10:32' },
]

export default function Chat() {
  const [activeChat, setActiveChat] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (!newMessage.trim()) return
    console.log('Enviando:', newMessage)
    setNewMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <main className="pt-16 h-screen bg-beige flex flex-col">
      <div className="flex flex-1 overflow-hidden">

        {/* Lista de conversaciones */}
        <aside className="w-80 flex-shrink-0 border-r border-carbon/10 flex flex-col">

          <div className="px-6 py-5 border-b border-carbon/10">
            <h1 className="font-display text-2xl font-bold text-carbon">Mensajes</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-beige-dark transition-colors duration-200 border-b border-carbon/5 ${
                  activeChat.id === conv.id ? 'bg-beige-dark' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full ${conv.bg} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                  {conv.user.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-carbon truncate">{conv.user}</p>
                    <span className="text-xs text-muted flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted truncate">{conv.lastMessage}</p>
                </div>

                {/* Badge no leído */}
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-terracota flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-white font-medium">{conv.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Panel del chat activo */}
        <div className="flex-1 flex flex-col">

          {/* Header del chat */}
          <div className="px-8 py-5 border-b border-carbon/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${activeChat.bg} flex items-center justify-center text-white text-sm font-medium`}>
                {activeChat.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-carbon">{activeChat.user}</p>
                <p className="text-xs text-muted">{activeChat.product}</p>
              </div>
            </div>
            <button className="text-xs font-medium text-terracota border border-terracota/30 px-4 py-2 rounded hover:bg-terracota hover:text-white transition-all duration-200">
              Ver prenda
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.mine
                    ? 'bg-carbon text-white rounded-br-sm'
                    : 'bg-white border border-carbon/10 text-carbon rounded-bl-sm'
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.mine ? 'text-white/50' : 'text-muted'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input de mensaje */}
          <div className="px-8 py-5 border-t border-carbon/10 flex items-center gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribí un mensaje..."
              className="flex-1 bg-white border border-carbon/15 rounded-full px-5 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200"
            />
            <button
              onClick={handleSend}
              className="w-11 h-11 rounded-full bg-terracota hover:bg-terracota-dark flex items-center justify-center transition-colors duration-200 flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}