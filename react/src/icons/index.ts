const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
    requireContext.keys().map(requireContext)
    // requireContext.keys().map((...args) => {
    //     requireContext(...args)
    // })
    // console.log(requireContext.keys())
}
requireAll(req)
