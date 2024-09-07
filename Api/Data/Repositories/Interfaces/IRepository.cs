namespace Data.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> AddAsync(T entity);
        Task<T> Update(T entity);
        Task Delete(T entity);
        Task DeleteAsync(Guid id);
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
    }
}
