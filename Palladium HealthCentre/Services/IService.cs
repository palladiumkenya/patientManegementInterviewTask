using System.Collections.Generic;

namespace Palladium.HealthCentre.Services
{
    interface IService<T>
    {
        void Save(T obj);

        void Update(T obj);

        void Delete(long id);

        List<T> GetAll();

        T GetById(long id);
    }
}
