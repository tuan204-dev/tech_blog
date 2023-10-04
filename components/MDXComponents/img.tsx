const img = (props: any) => (
  <div className="flex justify-center overflow-hidden h-[400px] lg:h-96 md:h-80">
    <img loading="lazy" {...props} className="object-contain" />
  </div>
)

export default img
