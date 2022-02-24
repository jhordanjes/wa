import { useMutation } from '@apollo/client';
import Head from 'next/head';
import { Formik, Form } from 'formik';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as yup from 'yup';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Input } from '../components/Input';
import { ADD_USER } from '../querys/ADD_USER';
import { Container, Content, Header } from '../styles/components';
import { IStudent } from '../interfaces/IStudent';

type SubmitProps = Omit<IStudent, 'sku'>;

// Validação do formulário
const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Campo obrigatório'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .matches(
      /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/g,
      'CPF deve ter 11 dígitos',
    ),
});

function Cadastro() {
  const router = useRouter();
  const [addUser, { loading }] = useMutation(ADD_USER); // Função para adicionar aluno

  const handleSubmit = ({ cpf, email, name }: SubmitProps) => {
    const cpfFormatted = cpf.replace(/[.-]/g, '');
    addUser({ variables: { cpf: cpfFormatted, email, name } });
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Students | Caddastro</title>
      </Head>
      <Container>
        <Header>
          <div className="container">
            <Link href="/">
              <a className="text-light">
                <AiOutlineArrowLeft size={22} />
              </a>
            </Link>
          </div>
        </Header>

        <Content className="container">
          <Row>
            <Col md={12}>
              <h4>Cadastro de aluno</h4>
              <p>Preencha todos os campos.</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Formik
                initialValues={{ email: '', name: '', cpf: '' }}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Input
                    type="text"
                    name="name"
                    label="Nome"
                    placeholder="Nome do aluno"
                  />

                  <Input
                    type="text"
                    name="cpf"
                    label="CPF"
                    placeholder="___.___.___.__"
                    mask="999.999.999-99"
                  />

                  <Input type="email" name="email" label="Email" />

                  <Col xs={{ span: 4, offset: 4 }}>
                    <Button
                      className="w-100"
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? <Spinner animation="border" /> : 'Salvar'}
                    </Button>
                  </Col>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Content>
      </Container>
    </div>
  );
}

export default Cadastro;
