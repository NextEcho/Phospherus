const Divider = () => {
    return (
        <>
            <div className="item-divider flex no-repeat my-6 w-full h-px max-w-4xl"
                style={{
                    backgroundImage: "radial-gradient(circle at center, #4e4e64 1px, transparent 1px)",
                    backgroundSize: "6px 1px",
                    backgroundRepeat: "repeat",
                    maskImage: "radial-gradient(at center, #fff, transparent 90%)",
                }}>
            </div>
        </>
    )
}

export default Divider;