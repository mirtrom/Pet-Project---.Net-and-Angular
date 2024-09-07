using Data.Data;
using Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories.Implementations
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        public readonly DbSet<T> dbSet;
        protected readonly StoreDbContext dbContext;
        protected Repository(StoreDbContext context)
        {
            dbContext = context;
            dbSet = context.Set<T>();
        }
        public async Task<T> AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
            await dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(T entity)
        {
            dbSet.Remove(entity);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            await Delete(entity);

        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            var entity = await dbSet.FindAsync(id);
            return entity;
        }

        public async Task<T> Update(T entity)
        {
            dbSet.Update(entity);
            await dbContext.SaveChangesAsync();
            return entity;
        }
    }
}
