import { Button, Modal } from 'react-bootstrap';

interface Props {
  sku: string;
  onRemoveUser: (sku: string) => void; // Função para excluir aluno
  onClose: () => void; // Função para fechar modal
}

// Modal para confirmação de exclusão

export function ModalConfirmRemoveUser({ sku, onRemoveUser, onClose }: Props) {
  return (
    <Modal show={!!sku} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remover aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza que deseja remover este aluno?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => onRemoveUser(sku)}>
          Remover
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
