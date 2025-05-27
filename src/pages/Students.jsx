import { useEffect, useState } from 'react';
import API from '../api/api';
import '../styles/moreover.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    student_name: '',
    student_code: '',
    program: ''
  });

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    API.get('/students')
      .then(res => setStudents(res.data.data))
      .catch(err => console.error(err));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.student_name || !formData.student_code) {
      setMessage('❌ El nombre y código del estudiante son obligatorios');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await API.post('/students', formData);
      
      if (response.data.success) {
        setMessage('✅ Estudiante creado exitosamente!');
        setFormData({ student_name: '', student_code: '', program: '' });
        setShowForm(false);
        loadStudents(); // Recargar la lista de estudiantes
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(`❌ Error: ${error.response.data.message}`);
      } else {
        setMessage(`❌ Error de conexión: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ student_name: '', student_code: '', program: '' });
    setMessage('');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Estudiantes</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showForm ? 'Cancelar' : 'Añadir Estudiante'}
        </button>
      </div>

      {/* Mostrar mensaje de éxito/error */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      {/* Formulario para añadir estudiante */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border" id='form-container'>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Añadir Nuevo Estudiante</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="student_name" className="block text-sm font-medium text-gray-700 mb-1"
              id='label-student-name'>
                Nombre del Estudiante *
              </label>
              <input
                type="text"
                id="student_name"
                name="student_name"
                value={formData.student_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div className='mb-4'>
              <label htmlFor="student_code" className="block text-sm font-medium text-gray-700 mb-1">
                Código del Estudiante *
              </label>
              <input
                type="text"
                id="student_code"
                name="student_code"
                value={formData.student_code}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: EST2024001"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                Programa de Estudios
              </label>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Ingeniería de Sistemas"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Estudiante'}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de estudiantes */}
      <div className="bg-white rounded-lg shadow-md">
        {students.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay estudiantes registrados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Programa
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.student_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.student_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.program || 'No especificado'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;