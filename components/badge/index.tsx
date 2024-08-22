import styles from './style.module.css'

export function OptionBadge({ type }: { type?: 'get' | 'post' }) {
  const text = type.toUpperCase() || 'GET'
  return (
    <span className={`${styles.badge} ${text === 'GET' && styles.badgeGet} ${text === 'POST' && styles.badgePost}`}>{text}</span>
  )
}
