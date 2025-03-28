import { Certificate } from '../types';
import Button from './Button';
import Image from 'next/image';

interface CertificateCardProps {
  certificate: Certificate;
  onVerify?: (certificate: Certificate) => void;
}

export default function CertificateCard({ certificate, onVerify }: CertificateCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{certificate.course.title}</h3>
            <p className="text-sm text-gray-500">
              Emitido em {new Date(certificate.issueDate).toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="flex-shrink-0">
            <svg
              className="h-12 w-12 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="relative h-8 w-8">
              <Image
                src={certificate.user.image || '/default-avatar.png'}
                alt={certificate.user.name || 'Usuário'}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{certificate.user.name}</p>
              <p className="text-sm text-gray-500">{certificate.user.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={() => onVerify?.(certificate)}>
            Verificar Certificado
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">ID do Certificado: {certificate.id}</div>
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Ver no Blockchain
          </a>
        </div>
      </div>
    </div>
  );
}
