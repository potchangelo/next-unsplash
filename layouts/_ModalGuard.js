function ModalGuard({ children }) {
    return (
        <div style={{cursor: 'default'}} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    );
}

export default ModalGuard;