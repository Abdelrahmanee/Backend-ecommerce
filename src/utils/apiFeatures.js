


export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }

    pagination() {
        const { page } = this.searchQuery
        if (page <= 0) this.searchQuery.page = 1

        let pageNumber = this.searchQuery.page * 1 || 1
        const pageLimit = 5
        const skip = (pageNumber - 1) * pageLimit
        this.pageNumber =pageNumber
        this.mongooseQuery.limit(pageLimit).skip(skip)
        return this
    }

    filter() {
        const exculdedFields = ['page', 'sort', 'fields', 'keyword']
        let filterObj = { ... this.searchQuery }
        exculdedFields.forEach(val => delete filterObj[val])

        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(lt|lte|gt|gte)/g, match => `$` + match)

        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }
    sort() {
        if (this.searchQuery.sort) {
            let { sort } = this.searchQuery
            sort = sort.split(',').join(' ')

            this.mongooseQuery.sort(sort)
        }
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let { fields } = this.searchQuery
            fields = fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }
    search() {
        if (this.searchQuery.keyword) {
            const { keyword } = this.searchQuery
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex:keyword  , $options : 'i'} },
                    { discrption: { $regex:keyword , $options : 'i' } },
                ]
            })
        }
        return this
    }
} 