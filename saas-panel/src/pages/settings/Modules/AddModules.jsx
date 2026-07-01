import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useColorContext } from '../../../context/context';
import { useMutationApi } from '../../../utils/useApi';
import ApiConfig from '../../../config/ApiConfig';
import Pop from '../../../components/common/pop';

const AddModule = ({
  open,
  onClose,
  children,
  title = "Form",
  submitLabel = "Submit",
  status,
  width = "max-w-lg",
  editData = null
}) => {
  const { color } = useColorContext();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [updateId, setUpdateId] = useState(null);
  // Update form data when editData changes
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        price: editData.price || '',
        description: editData.description || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        description: ''
      });
    }
  }, [editData]);

  const moduleMutation = useMutationApi({
    key: "Module",
    url: ApiConfig.MODULE_CREATE,
    method: 'POST',
    requireAuth: true,
    options: {
      onSuccess: async ()=>{
        onClose();
        setFormData({
          name: '',
          price: '',
          description: ''
        });
        Pop("success", editData ? "Module updated successfully!" : "Module added successfully!");
      },
      onError:(err)=>{
        Pop("error", "Failed to add module. Please try again.");
        console.log(err);
      }
    }
  })

    const editModuleMutation = useMutationApi({
    key: "Module", // Same key as useGetApi to ensure proper invalidation
    url: "/module", // Base URL, ID will be passed in mutation
    method: 'PATCH',
    requireAuth: true,
    options: {
      onSuccess: async ()=>{
        onClose();
        setFormData({
          name: '',
          price: '',
          description: ''
        });
        Pop("success", "Module updated successfully!");
        setUpdateId(null);
      },
      onError:(err)=>{
        Pop("error", "Failed to update module. Please try again.");
        console.log(err);
      }
    }
  })

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    editModuleMutation.mutate({
      id: editData?.id, // Pass the ID to the mutation
      payload: formData
    });
  };

    const handleFormSubmit = (e) => {
    e.preventDefault();
    moduleMutation.mutate(
      { payload: formData },
    )
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setFormData({
      name: '',
      price: '',
      description: ''
    });
    onClose();
  };
  
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className={`bg-white rounded-2xl shadow-xl p-6 w-full ${width}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={handleClose} className="text-gray-500 bg-gray-200 p-1.5 rounded-full cursor-pointer hover:text-gray-700">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={editData?handleEditFormSubmit:handleFormSubmit} className="space-y-4">
          {/* becuse sir ne ak meeting me kha tha ki moduple purne hatege nhi update hone ke badh naya module banega  */}
          {React.cloneElement(children, { formData, handleInputChange })}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              style={{backgroundColor: color}}
              className="text-white cursor-pointer px-5 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Please wait...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModule;
