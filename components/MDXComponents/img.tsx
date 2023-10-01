const img = (props: any) => (
  <div className="flex justify-center overflow-hidden">
    <img loading="lazy" {...props} />
  </div>
)

export default img
