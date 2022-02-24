import Head from 'next/head';
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { FiTrash } from 'react-icons/fi';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '../components/Input';
import { Table } from '../styles/pages/home';
import { GET_USERS } from '../querys/GET_USERS';
import { IStudent } from '../interfaces/IStudent';
import { DELETE_USER } from '../querys/DELETE_USER';
import { ModalConfirmRemoveUser } from '../components/ModalConfirmRemoveUser';
import { Container, Content, Header } from '../styles/components';

const schema = yup.object({
  email: yup.string().email('Digite um email válido'),
  name: yup.string(),
  cpf: yup
    .string()
    .matches(
      /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/g,
      'CPF deve ter 11 dígitos',
    ),
});

type SubmitProps = Omit<IStudent, 'sku'>;

function Home() {
  const [getStudents, { loading, error, data }] = useLazyQuery<{
    users: IStudent[];
  }>(GET_USERS, {
    pollInterval: 1000 * 60 * 10, // 10 minutes
  }); // Requisição pra buscar alunos

  const [removeUser] = useMutation(DELETE_USER, {
    onCompleted: getStudents,
  }); // Requisição pra remover aluno

  const [skuUserRemove, setSkuUserRemove] = useState<string>();

  useEffect(() => {
    getStudents();
  }, []);

  const handleSubmit = async ({ cpf, email, name }: SubmitProps) => {
    const cpfFormatted = cpf.replace(/[.-]/g, '');
    getStudents({ variables: { cpf: cpfFormatted, email, name } });
  };

  const handleRemoveUser = (sku: string) => {
    removeUser({ variables: { sku } });
    setSkuUserRemove(undefined);
  };

  const handleFormatCpf = (value: string) =>
    value.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4');

  return (
    <div>
      <Head>
        <title>Students | Home</title>
      </Head>
      {skuUserRemove && (
        <ModalConfirmRemoveUser
          sku={skuUserRemove}
          onRemoveUser={handleRemoveUser}
          onClose={() => setSkuUserRemove(undefined)}
        />
      )}

      <Container>
        <Header>
          <div className="container">
            <Link href="/" passHref>
              <h3 className="fw-bolder text-light">students.</h3>
            </Link>
          </div>
        </Header>

        <Content className="container">
          <Row>
            <Col md={10}>
              <h4>Todos os alunos:</h4>
              <p>Aplique filtros para uma pesquisa mais precisa.</p>
            </Col>
            <Col
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              <Link href="/cadastro" passHref>
                <Button variant="light">Adicionar</Button>
              </Link>
            </Col>
          </Row>

          <Formik
            initialValues={{ email: '', name: '', cpf: '' }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <Form>
                <Row>
                  <Col md={3}>
                    <Input
                      type="text"
                      name="name"
                      label="Nome"
                      placeholder="Nome do aluno"
                    />
                  </Col>

                  <Col md={3} xs={6}>
                    <Input
                      type="text"
                      name="cpf"
                      label="CPF"
                      placeholder="___.___.___.__"
                      mask="999.999.999-99"
                    />
                  </Col>

                  <Col md={3} xs={6}>
                    <Input type="email" name="email" label="Email" />
                  </Col>

                  <Col md={{ span: 3, offset: 0 }} xs={{ span: 8, offset: 2 }}>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary h-100" type="submit">
                        Buscar
                      </button>

                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => {
                          getStudents();
                          resetForm();
                        }}
                      >
                        Limpar filtros
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          <div className="mt-5">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
                <h6 className="mb-0 ms-2">Carregando...</h6>
              </div>
            ) : error ? (
              <Col md={{ span: 4, offset: 4 }}>
                <Alert variant="danger">
                  Erro ao buscar Alunos.
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => getStudents()}
                  >
                    Tente novamente
                  </button>
                </Alert>
              </Col>
            ) : data && data?.users.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Opçoes</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users.map(item => (
                    <tr key={item.sku}>
                      <td>{item.name}</td>
                      <td>{handleFormatCpf(item.cpf)}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setSkuUserRemove(item.sku)}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="d-flex flex-column align-items-center w-100">
                <img src="/icons/empty.svg" alt="Nada encontrado" width="120" />
                <h5>Nada encontrado</h5>
              </div>
            )}
          </div>
        </Content>
      </Container>
    </div>
  );
}

export default Home;
