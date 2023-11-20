namespace OrderBackend.Dtos
{
    public class NewCustomerDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int AddressId { get; set; }
    }
}
