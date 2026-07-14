import { useState } from 'react'
import './App.css'

function App() {
  const [telaAtual, setTelaAtual] = useState('onboarding')

  const [perfil, setPerfil] = useState({
    nome: '',
    aniversario: '',
    signo: '',
  })

  const [humorSelecionado, setHumorSelecionado] = useState(null)
  const [diario, setDiario] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [novaTarefa, setNovaTarefa] = useState('')
  const [abaAtiva, setAbaAtiva] = useState('Meu Dia')
  const [menuAberto, setMenuAberto] = useState(false)

  const iniciarApp = () => {
    if (perfil.nome.trim() !== '') {
      setTelaAtual('app')
    } else {
      alert('Por favor, me diga como quer ser chamada! 🌸')
    }
  }

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa, concluida: false }])
      setNovaTarefa('')
    }
  }

  const alternarConclusao = (id) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ))
  }

  if (telaAtual === 'onboarding') {
    return (
      <div className="app-container onboarding-container">
        <div className="onboarding-card">
          <div className="onboarding-icon">✨</div>
          <h1 className="onboarding-title">Bem-vinda!</h1>
          <p className="onboarding-subtitle">Vamos preparar o seu cantinho especial.</p>

          <div className="input-group">
            <label>Como quer ser chamada? 🌷</label>
            <input
              type="text"
              className="cute-input"
              placeholder="Ex: Florzinha"
              value={perfil.nome}
              onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Quando é o seu aniversário? 🎂</label>
            <input
              type="date"
              className="cute-input"
              value={perfil.aniversario}
              onChange={(e) => setPerfil({ ...perfil, aniversario: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Qual o seu signo? 🔮</label>
            <select
              className="cute-input"
              value={perfil.signo}
              onChange={(e) => setPerfil({ ...perfil, signo: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option value="Áries">Áries ♈</option>
              <option value="Touro">Touro ♉</option>
              <option value="Gêmeos">Gêmeos ♊</option>
              <option value="Câncer">Câncer ♋</option>
              <option value="Leão">Leão ♌</option>
              <option value="Virgem">Virgem ♍</option>
              <option value="Libra">Libra ♎</option>
              <option value="Escorpião">Escorpião ♏</option>
              <option value="Sagitário">Sagitário ♐</option>
              <option value="Capricórnio">Capricórnio ♑</option>
              <option value="Aquário">Aquário ♒</option>
              <option value="Peixes">Peixes ♓</option>
            </select>
          </div>

          <button className="cute-button" type="button" onClick={iniciarApp}>
            Começar jornada 💖
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      {menuAberto && (
        <div className="menu-overlay" onClick={() => setMenuAberto(false)}></div>
      )}

      <div className={`side-menu ${menuAberto ? 'open' : ''}`}>
        <button className="close-menu" type="button" onClick={() => setMenuAberto(false)}>
          ✖
        </button>
        <div className="profile-info">
          <div className="avatar">🌸</div>
          <h3>{perfil.nome}</h3>
          <p>{perfil.signo ? `${perfil.signo}` : 'Sem signo definido'}</p>
        </div>
        <div className="menu-links">
          <button
            type="button"
            onClick={() => { setTelaAtual('onboarding'); setMenuAberto(false) }}
          >
            ✏️ Editar Perfil
          </button>
          <button type="button">⚙️ Configurações</button>
          <button type="button">🐾 Meu Pet Virtual</button>
        </div>
      </div>

      <header className="header">
        <button className="menu-btn" type="button" onClick={() => setMenuAberto(true)}>
          ☰
        </button>
        <div className="header-titles">
          <span className="greeting">OLÁ, {perfil.nome.toUpperCase()} ✿</span>
          <h1 className="date">Meu Dia Mágico</h1>
        </div>
        <div className="header-spacer"></div>
      </header>

      <div className="content-area">
        {abaAtiva === 'Meu Dia' && (
          <>
            <section className="card">
              <h2 className="card-title">Como você está se sentindo?</h2>
              <div className="mood-options">
                {[
                  { emoji: '🌸', nome: 'Radiante' },
                  { emoji: '🐰', nome: 'Feliz' },
                  { emoji: '🐣', nome: 'Neutro' },
                  { emoji: '🌧️', nome: 'Pra baixo' },
                  { emoji: '🐨', nome: 'Cansada' },
                ].map((item) => (
                  <div
                    key={item.nome}
                    className={`mood-item ${humorSelecionado === item.nome ? 'selected' : ''}`}
                    onClick={() => setHumorSelecionado(item.nome)}
                  >
                    <span className="emoji">{item.emoji}</span>
                    <p>{item.nome}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h2 className="card-title">✨ Me conta sobre o seu dia... 💖</h2>
              <textarea
                className="diary-input"
                placeholder="Escreva livremente, esse cantinho é só seu..."
                value={diario}
                onChange={(e) => setDiario(e.target.value)}
              ></textarea>
            </section>

            <section className="todo-section">
              <h2 className="section-title">🌟 Coisinhas Importantes</h2>
              <div className="add-todo-container">
                <input
                  type="text"
                  className="todo-input cute-input"
                  placeholder="Adicionar uma coisinha..."
                  value={novaTarefa}
                  onChange={(e) => setNovaTarefa(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
                />
                <button className="add-button" type="button" onClick={adicionarTarefa}>
                  +
                </button>
              </div>

              {tarefas.length === 0 ? (
                <div className="todo-empty">
                  <p>Tudo em dia! Respira fundo 🫧</p>
                </div>
              ) : (
                <ul className="todo-list">
                  {tarefas.map(tarefa => (
                    <li
                      key={tarefa.id}
                      className={`todo-item ${tarefa.concluida ? 'completed' : ''}`}
                      onClick={() => alternarConclusao(tarefa.id)}
                    >
                      {tarefa.concluida ? '✅' : '⬜'} {tarefa.texto}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        {abaAtiva === 'Diário' && (
          <section className="card">
            <h2 className="card-title">Seu Diário Íntimo 📔</h2>
            <div className="todo-empty">
              <p>Suas memórias guardadas com carinho aparecerão aqui. 💌</p>
            </div>
          </section>
        )}

        {abaAtiva === 'Calendário' && (
          <section className="card">
            <h2 className="card-title">Seu Mês 📅</h2>
            <div className="calendar-grid">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, i) => (
                <div className="cal-header" key={`${dia}-${i}`}>{dia}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div className="cal-day" key={i + 1}>{i + 1}</div>
              ))}
            </div>
          </section>
        )}
      </div>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${abaAtiva === 'Meu Dia' ? 'active' : ''}`}
          type="button"
          onClick={() => setAbaAtiva('Meu Dia')}
        >
          <span className="nav-icon">🏠</span>
          <p>Meu Dia</p>
        </button>
        <button
          className={`nav-item ${abaAtiva === 'Diário' ? 'active' : ''}`}
          type="button"
          onClick={() => setAbaAtiva('Diário')}
        >
          <span className="nav-icon">📔</span>
          <p>Diário</p>
        </button>
        <button
          className={`nav-item ${abaAtiva === 'Calendário' ? 'active' : ''}`}
          type="button"
          onClick={() => setAbaAtiva('Calendário')}
        >
          <span className="nav-icon">🪴</span>
          <p>Calendário</p>
        </button>
      </nav>
    </div>
  )
}

export default App
