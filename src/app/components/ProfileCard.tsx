import { User } from '../types';
import Image from 'next/image';
import Button from './Button';

interface ProfileCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export default function ProfileCard({ user, onEdit }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="absolute -bottom-12 left-6">
          <div className="relative h-24 w-24 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={user.image || '/default-avatar.png'}
              alt={user.name || 'Usuário'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-14 px-6 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="flex-shrink-0">
            <Button variant="outline" size="sm" onClick={() => onEdit?.(user)}>
              Editar Perfil
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">Função</div>
            <div className="mt-1 text-sm text-gray-900 capitalize">{user.role}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">Membro desde</div>
            <div className="mt-1 text-sm text-gray-900">
              {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Cursos Inscritos</div>
            <div className="text-sm text-gray-900">{user.progress?.length || 0}</div>
          </div>

          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{
                width: `${((user.progress?.length || 0) / 10) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Última atualização</div>
          <div className="text-sm text-gray-900">
            {new Date(user.updatedAt).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  );
}
