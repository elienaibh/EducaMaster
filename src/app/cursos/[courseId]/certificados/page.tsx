import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../config/auth';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Link from 'next/link';

interface Certificate {
  id: string;
  title: string;
  description: string;
  type: 'completion' | 'specialization' | 'participation';
  status: 'available' | 'pending' | 'expired';
  issueDate?: string;
  expiryDate?: string;
  grade?: string;
  certificateUrl?: string;
  verificationCode?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Certificados | EducaMaster AI',
    description: 'Certificados do curso',
  };
}

// Dados mockados dos certificados
const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Certificado de Conclusão - IA para Iniciantes',
    description: 'Certificado de conclusão do curso de Inteligência Artificial para Iniciantes',
    type: 'completion',
    status: 'available',
    issueDate: '2024-03-15',
    grade: 'A',
    certificateUrl: '/certificates/1.pdf',
    verificationCode: 'ABC123XYZ',
  },
  {
    id: '2',
    title: 'Certificado de Especialização - Machine Learning',
    description: 'Certificado de especialização em Machine Learning',
    type: 'specialization',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Certificado de Participação - Workshop IA',
    description: 'Certificado de participação no Workshop de IA',
    type: 'participation',
    status: 'expired',
    issueDate: '2024-02-01',
    expiryDate: '2024-03-01',
    certificateUrl: '/certificates/3.pdf',
    verificationCode: 'DEF456UVW',
  },
];

export default async function CertificatesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Certificados</h1>
          <p className="mt-2 text-gray-600">Acesse seus certificados e diplomas</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mockCertificates.map(certificate => (
            <Card key={certificate.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{certificate.title}</h2>
                  <p className="text-gray-600 mb-4">{certificate.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {certificate.type === 'completion' && 'Certificado de Conclusão'}
                      {certificate.type === 'specialization' && 'Certificado de Especialização'}
                      {certificate.type === 'participation' && 'Certificado de Participação'}
                    </div>
                    {certificate.issueDate && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Emitido em: {new Date(certificate.issueDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    {certificate.expiryDate && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Expira em: {new Date(certificate.expiryDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    {certificate.grade && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Nota: {certificate.grade}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {certificate.status === 'available' && (
                    <div className="flex flex-col items-end">
                      <Link href={certificate.certificateUrl || '#'}>
                        <Button>Baixar Certificado</Button>
                      </Link>
                      {certificate.verificationCode && (
                        <div className="mt-2 text-sm text-gray-500">
                          Código: {certificate.verificationCode}
                        </div>
                      )}
                    </div>
                  )}

                  {certificate.status === 'pending' && (
                    <div className="text-right">
                      <div className="text-yellow-500 font-semibold">Em Processamento</div>
                      <div className="text-sm text-gray-500">Aguarde a conclusão do curso</div>
                    </div>
                  )}

                  {certificate.status === 'expired' && certificate.expiryDate && (
                    <div className="text-right">
                      <div className="text-red-500 font-semibold">Expirado</div>
                      <div className="text-sm text-gray-500">
                        {new Date(certificate.expiryDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
