function requireSvg() {
  const requireAll = (requireContext) => requireContext.keys().forEach(requireContext)

  requireAll(
    require.context('/node_modules/@severstal/market-ui-library/src/assets/icons/', true, /\.svg$/)
  )
}

export default requireSvg
