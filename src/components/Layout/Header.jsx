import React from 'react'

const Header = async () => {
  const menu = await getMenu("New-Updated_Menu-Aujla");
  return (
    <nav>Header</nav>
  )
}

export default Header